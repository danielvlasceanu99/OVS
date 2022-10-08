package com.crystal.ovs.controllers;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping(path = "api/v1/file")
@CrossOrigin(origins = "http://localhost:4200")
public class FileController {
    private String FILE_PATH_ROOT = "../server/src/main/resources/images/";

    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) {
        byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File(FILE_PATH_ROOT+filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    @PostMapping(path = "/uploadImage")
    public ResponseEntity<?> fileUpload(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String destPath = "../server/src/main/resources/images/";
        File filePath = new File(destPath);
        assert fileName != null;
        File dest = new File(filePath.getAbsolutePath(), fileName);

        try {
            file.transferTo(dest);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
