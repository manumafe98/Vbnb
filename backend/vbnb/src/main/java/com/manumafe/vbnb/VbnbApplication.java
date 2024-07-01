package com.manumafe.vbnb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class VbnbApplication {

	public static void main(String[] args) {
		SpringApplication.run(VbnbApplication.class, args);
	}

}
