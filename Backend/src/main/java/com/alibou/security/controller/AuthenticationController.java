package com.alibou.security.controller;

import com.alibou.security.Repository.ForgetRepository;
import com.alibou.security.request.AuthenticationRequest;
import com.alibou.security.respense.AuthenticationResponse;
import com.alibou.security.service.AuthenticationService;
import com.alibou.security.request.RegisterRequest;
import com.alibou.security.entities.User;
import com.alibou.security.entities.Forget;
import com.alibou.security.respense.*;
import com.alibou.security.respense.NameRespense;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final com.alibou.security.Repository.UserRepository UserRepository  ;

    private final ForgetRepository fg;


    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            AuthenticationResponse response = service.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResponse> authenticate(

            @RequestBody AuthenticationRequest request
    ) {

        return ResponseEntity.ok(service.authenticate(request));
    }




    /////////confirmer compte NameRespense
    @GetMapping(path = "/token")
    public String confirm(@RequestParam("token") String token) {
        return service.confirmToken(token);
    }


//
    @GetMapping("/b/{email}")
    public NameRespense findUserNameByEmail(@PathVariable String email) {
        Optional<User> userExists = UserRepository.findByEmail(email);
        NameRespense e = new NameRespense();
        e.setName(userExists.get().getName());

        e.setId(userExists.get().getId());
        return e;
    }


//find NameRespense by user id
    @GetMapping("/email/{id}")
    public NameRespense get_email(@PathVariable Integer id) {
        Optional<User> us = UserRepository.findById(id);
        NameRespense e = new NameRespense();
        e.setName(us.get().getName());
        return e;
    }


    //envoyer le code a ce mail
    @PostMapping("/Forget")
    public Forget forget(@RequestBody EmailRespense email){

return service.forget(email.getEmail());
    }

//find code by NameRespense
    @GetMapping("/code/{email}")
    public Forget code(@PathVariable String email){
     return    fg.findByEmail(email);

    }

    //effacer le code
    @DeleteMapping("/code/{id}")
    public void deleteCode(@PathVariable Integer id){
        fg.deleteById(id); }


//reset password
    @PostMapping("/rest_password")
    public AuthenticationRequest pass(@RequestBody AuthenticationRequest aut)
    {
        service.forg(aut);
        return aut ;

    }
}