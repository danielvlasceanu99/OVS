package com.crystal.ovs.controllers;

import com.crystal.ovs.dto.DtoTransaction;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.models.Transaction;
import com.crystal.ovs.services.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/transaction")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public List<Transaction> getAllTransactions(){
        return transactionService.getAllTransactions();
    }

    @GetMapping(path = "{id}")
    public Transaction getTransactionById(@PathVariable Long id){
        return transactionService.getTransactionById(id);
    }

    @GetMapping(path = "user-id/{userId}")
    public List<Transaction> getAllTransactionsByUserId(@PathVariable Long userId) {
        return transactionService.getAllTransactionsByUserId(userId);
    }

    @PostMapping
    public Response<Transaction> insertTransaction(@RequestBody DtoTransaction dtoTransaction, HttpServletResponse httpResponse){
        Response<Transaction> response = transactionService.insertTransaction(dtoTransaction);
        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @PutMapping(path = "{id}")
    public Response<Transaction> updateTransaction(@PathVariable Long id, @RequestBody DtoTransaction dtoTransaction, HttpServletResponse httpResponse){
        Response<Transaction> response = transactionService.updateTransaction(id, dtoTransaction);
        if(response.getErrors().size() > 0){
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping(path = "{id}")
    public Response<String> deleteTransaction(@PathVariable Long id){
        return new Response<>(transactionService.deleteTransaction(id));
    }
}
