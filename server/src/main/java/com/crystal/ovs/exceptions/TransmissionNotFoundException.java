package com.crystal.ovs.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TransmissionNotFoundException extends RuntimeException{
    private static final String MESSAGE = "Can't find the TRANSMISSION with this id";

    public TransmissionNotFoundException() {
        super(MESSAGE);
    }
}
