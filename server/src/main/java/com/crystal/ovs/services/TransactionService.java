package com.crystal.ovs.services;

import com.crystal.ovs.dto.DtoTransaction;
import com.crystal.ovs.dto.Response;
import com.crystal.ovs.exceptions.TransactionNotFoundException;
import com.crystal.ovs.models.Car;
import com.crystal.ovs.models.Transaction;
import com.crystal.ovs.repositories.AppUserRepository;
import com.crystal.ovs.repositories.PostRepository;
import com.crystal.ovs.repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final PostRepository postRepository;
    private final AppUserRepository appUserRepository;

    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long id){
        return transactionRepository
                .findById(id)
                .orElseThrow(TransactionNotFoundException::new);
    }

    public List<Transaction> getAllTransactionsByUserId(Long id){
        return transactionRepository.getTransactionByUserId(id);
    }

    public Response<Transaction> insertTransaction(DtoTransaction dtoTransaction) {
        Response<Transaction> response = new Response<>();
        response.setErrors(validate(dtoTransaction));

        if(response.getErrors().size() == 0){
            Transaction transaction = new Transaction();
            transaction.setFields(dtoTransaction);
            transaction.getPost().getCar().setAvailable(transaction.getPost().getCar().getAvailable() - 1);
            response.setResponseBody(transactionRepository.save(transaction));
        }

        return response;
    }

    @Transactional
    public Response<Transaction> updateTransaction(Long id, DtoTransaction dtoTransaction){
        Response<Transaction> response = new Response<>();
        response.setErrors(validate(dtoTransaction));

        Transaction transaction = transactionRepository
                .findById(id)
                .orElseThrow(TransactionNotFoundException::new);

        if(response.getErrors().size() == 0){
            transaction.setFields(dtoTransaction);
            response.setResponseBody(transaction);
        }

        return response;
    }

    @Transactional
    public String deleteTransaction(Long id){
        if(!transactionRepository.existsById(id)){
            throw new TransactionNotFoundException();
        }
        Car car = transactionRepository.findById(id).get().getPost().getCar();
        car.setAvailable(car.getAvailable() + 1);
        transactionRepository.deleteById(id);
        return "Transaction removed";
    }

    private List<String> validate(DtoTransaction dtoTransaction) {
        List<String> validationErrors = new ArrayList<>();


        if(dtoTransaction.getDate() == null){
            validationErrors.add("Missing date");
        } else if(dtoTransaction.getDate().compareTo(LocalDate.now()) > 0){
            validationErrors.add("Invalid date");
        }

        if(dtoTransaction.getPostId() == null){
            validationErrors.add("Missing post id");
        } else if(!postRepository.existsById(dtoTransaction.getPostId())){
            validationErrors.add("There is no post with this id");
        } else if(postRepository.findById(dtoTransaction.getPostId()).get().getCar().getAvailable() == 0){
            validationErrors.add("This product is not in post");
        } else {
            dtoTransaction.setPost(postRepository.findById(dtoTransaction.getPostId()).get());
        }

        if(dtoTransaction.getUserId() == null){
            validationErrors.add("Missing user id");
        } else if(!appUserRepository.existsById(dtoTransaction.getUserId())){
            validationErrors.add("There is no user with this id");
        } else {
            dtoTransaction.setUser(appUserRepository.findById(dtoTransaction.getUserId()).get());
        }
        return validationErrors;
    }
}
