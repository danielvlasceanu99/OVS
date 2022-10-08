package com.crystal.ovs.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class PostNotFoundException extends RuntimeException{
    private static final String MESSAGE = "Can't find post with this id";

    public PostNotFoundException() {
        super(MESSAGE);
    }


}
