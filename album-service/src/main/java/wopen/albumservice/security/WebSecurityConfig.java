package wopen.albumservice.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final RestAuthenticationSuccessHandler restAuthenticationSuccessHandler;
    private final RestAuthenticationFailureHandler restAuthenticationFailureHandler;
    private final UserDetailsService dbUserDetailsService;
    private final ObjectMapper objectMapper;

    public WebSecurityConfig(
            RestAuthenticationFailureHandler restAuthenticationFailureHandler,
            RestAuthenticationSuccessHandler restAuthenticationSuccessHandler, UserDetailsService dbUserDetailsService, ObjectMapper objectMapper) {
        this.restAuthenticationFailureHandler = restAuthenticationFailureHandler;
        this.restAuthenticationSuccessHandler = restAuthenticationSuccessHandler;
        this.dbUserDetailsService = dbUserDetailsService;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/upload/image/*")
                .permitAll()
                .antMatchers("/password", "/users/me", "/upload/**")
                .authenticated()
                .anyRequest()
                .permitAll();

        http
                .formLogin().disable()
                .httpBasic().disable()
                .rememberMe().disable()
                .cors().disable()
                .csrf().disable()
                .headers().frameOptions().disable();

        http
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .accessDeniedHandler((req, res, ex) -> res.setStatus(HttpStatus.FORBIDDEN.value()));

        http.logout().logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpStatus.OK.value()));
        http.addFilterBefore(accountAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(accountAuthenticationProvider());
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AccountAuthenticationProvider accountAuthenticationProvider() {
        return new AccountAuthenticationProvider(passwordEncoder(), dbUserDetailsService);
    }

    private Filter accountAuthenticationFilter(AuthenticationManager authenticationManager) {
        AccountAuthenticationFilter filter = new AccountAuthenticationFilter();
        filter.setAuthenticationManager(authenticationManager);
        filter.setAuthenticationSuccessHandler(restAuthenticationSuccessHandler);
        filter.setAuthenticationFailureHandler(restAuthenticationFailureHandler);
        filter.setObjectMapper(objectMapper);
        return filter;
    }
}
