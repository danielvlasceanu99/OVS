package com.crystal.ovs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Response<T> {
    private T responseBody;
    private List<String> errors;

    public Response(T ok) {
        this.responseBody = ok;
    }
}
