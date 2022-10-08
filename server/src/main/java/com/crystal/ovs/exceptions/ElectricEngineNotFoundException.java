package com.crystal.ovs.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ElectricEngineNotFoundException extends RuntimeException {
    private static final String MESSAGE = "Can't find an electric engine with this id!";

    public ElectricEngineNotFoundException() {
        super(MESSAGE);
    }
}
