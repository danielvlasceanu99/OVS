package com.crystal.ovs.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TransactionNotFoundException extends RuntimeException{
    private static final String MESSAGE = "Can't find the TRANSACTION with this id";

    public TransactionNotFoundException() {
        super(MESSAGE);
    }
}
