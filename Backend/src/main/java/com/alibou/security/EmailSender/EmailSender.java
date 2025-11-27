package com.alibou.security.EmailSender;

public interface EmailSender {
    void send(String to, String email,String c);
}