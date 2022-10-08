package com.crystal.ovs.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class FuelEngineNotFoundException extends RuntimeException{
    private static final String MESSAGE = "Can't find fuel engine with this id";

    public FuelEngineNotFoundException() {
        super(MESSAGE);
    }
}
