package com.online.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
    
    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new Object());
        return "register";
    }
    
    @PostMapping("/register")
    public String registerProcess() {
        return "redirect:/login";
    }
    
    @PostMapping("/login-process")
    public String loginProcess() {
        return "redirect:/dashboard";
    }
}