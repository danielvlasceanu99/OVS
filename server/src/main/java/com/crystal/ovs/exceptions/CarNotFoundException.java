package com.crystal.ovs.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CarNotFoundException extends RuntimeException {
    private static final String MESSAGE = "Can't find a car with this id";

    public CarNotFoundException() {
        super(MESSAGE);
    }
}
