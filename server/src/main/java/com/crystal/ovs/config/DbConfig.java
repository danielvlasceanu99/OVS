package com.crystal.ovs.config;

import com.crystal.ovs.models.*;
import com.crystal.ovs.models.types.*;
import com.crystal.ovs.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


//@Configuration
public class DbConfig {
    //@Bean
    CommandLineRunner commandLineRunner(FuelEngineRepository fuelEngineRepository,
                                        ElectricEngineRepository electricEngineRepository,
                                        CarRepository carRepository,
                                        TransactionRepository transactionRepository,
                                        PostRepository postRepository,
                                        EngineRepository engineRepository,
                                        ImageRepository imageRepository,
                                        AppUserRepository appUserRepository,
                                        TransmissionRepository transmissionRepository,
                                        BCryptPasswordEncoder bCryptPasswordEncoder,
                                        RoleRepository roleRepository){
        return args -> {
          AppUser user1 = new AppUser("sfdsf","asdasd","cont@gmail.com","123456");
            List<AppUser> users = new ArrayList<>();
         String encodedPassword = bCryptPasswordEncoder.encode(user1.getPassword());
         user1.setPassword(encodedPassword);
            users.add(user1);
           //appUserRepository.saveAll(users);

            FuelEngine fuelEngine1 = new FuelEngine(
                    1L, 7.1F, 201F, 1.4F,8, true,
                    true, FuelType.GASOLINE, EngineLayout.V, StrokeType.FOUR_STROKE);
            FuelEngine fuelEngine2 = new FuelEngine(
                    2L, 7.1F, 202F, 1.4F, 8, true,
                    true, FuelType.DIESEL, EngineLayout.VR, StrokeType.FOUR_STROKE);
            List<FuelEngine> fuelEngineList = new ArrayList<>();
            fuelEngineList.add(fuelEngine1);
            fuelEngineList.add(fuelEngine2);
            //fuelEngineRepository.saveAll(fuelEngineList);

            Role role1=new Role(AppUserRole.USER);
            Role role2=new Role(AppUserRole.ADMIN);
            List<Role> roleList = new ArrayList<>();
            roleList.add(role1);
            roleList.add(role2);
            roleRepository.saveAll(roleList);


            ElectricEngine electricEngine1 = new ElectricEngine(1L, "TYPE1", 2500, 500);
            ElectricEngine electricEngine2 = new ElectricEngine(2L, "TYPE2", 3000, 600);
            List<ElectricEngine> electricEngineList = new ArrayList<>();
            electricEngineList.add(electricEngine1);
            electricEngineList.add(electricEngine2);
            //electricEngineRepository.saveAll(electricEngineList);

            Engine engine1 = new Engine(1, electricEngine1, fuelEngine1, 21, 23);
            Engine engine2 = new Engine(2, electricEngine2, null, 55, 23);
            Engine engine3 = new Engine(3, null, fuelEngine2, 55, 23);
            List<Engine> engineList = new ArrayList<>();
            engineList.add(engine1);
            engineList.add(engine2);
            engineList.add(engine3);
            //engineRepository.saveAll(engineList);

            Transmission transmission1 = new Transmission(1L, TransmissionType.AUTOMATIC, 8);
            Transmission transmission2 = new Transmission(2L, TransmissionType.MANUAL, 6);
            Transmission transmission3 = new Transmission(3L, TransmissionType.DUALCLUTCH, 7);
            List<Transmission> transmissionList = new ArrayList<>();
            transmissionList.add(transmission1);
            transmissionList.add(transmission2);
            transmissionList.add(transmission3);
            //transmissionRepository.saveAll(transmissionList);

            Car car1 = new Car(1L, "BMW", "M5CS", 100, 2021, engine1,
                    transmission1, 5, "RED", CarType.SEDAN, TractionType.AWD);
            Car car2 = new Car(2L, "Porche", "Turbo S", 100, 2021, engine2,
                    transmission2, 3, "WHITE", CarType.SPORTS, TractionType.AWD);
            Car car3 = new Car(3L, "Porche", "Turbo S", 100, 2021, engine3,
                    transmission2, 3, "WHITE", CarType.SPORTS, TractionType.AWD);
            List<Car> carList = new ArrayList<>();
            carList.add(car1);
            carList.add(car2);
            carList.add(car3);
            //carRepository.saveAll(carList);

            Post post1 = new Post(1,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car1, null);
            Post post2 = new Post(2,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car2, null);
            Post post3 = new Post(3,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car3, null);
            Post post4 = new Post(4,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car2, null);
            Post post5 = new Post(5,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car1, null);
            Post post6 = new Post(6,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car2, null);
            Post post7 = new Post(7,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car1, null);
            Post post8 = new Post(8,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car2, null);
            Post post9 = new Post(9,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car1, null);
            Post post10 = new Post(10,"BMW","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car2, null);
            Post post11 = new Post(11,"Ford","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 2400F, car2, null);
            List<Post> postList = new ArrayList<>();
            postList.add(post1);
            postList.add(post2);
            postList.add(post3);
            postList.add(post4);
            postList.add(post5);
            postList.add(post6);
            postList.add(post7);
            postList.add(post8);
            postList.add(post9);
            postList.add(post10);
            postList.add(post11);
            //postRepository.saveAll(postList);

            Transaction transaction1 = new Transaction(1L, post1, user1, LocalDate.now(), 501D);
            Transaction transaction2 = new Transaction(2L, post2,user1, LocalDate.now(), 502D);
            List<Transaction> transactions = new ArrayList<>();
            transactions.add(transaction1);
            transactions.add(transaction2);
            //transactionRepository.saveAll(transactions);

            Image image1 = new Image(1, "1.jpeg", post1);
            Image image2 = new Image(2, "2.jpeg", post1);
            Image image3 = new Image(3, "3.jpeg", post1);
            Image image4 = new Image(4, "1.jpeg", post2);
            Image image5 = new Image(5, "2.jpeg", post2);
            Image image6 = new Image(6, "3.jpeg", post2);
            Image image7 = new Image(7, "1.jpeg", post3);
            Image image8 = new Image(8, "2.jpeg", post3);
            Image image9 = new Image(9, "3.jpeg", post3);
            List<Image> imageList = new ArrayList<>();
            imageList.add(image1);
            imageList.add(image2);
            imageList.add(image3);
            imageList.add(image4);
            imageList.add(image5);
            imageList.add(image6);
            imageList.add(image7);
            imageList.add(image8);
            imageList.add(image9);
            //imageRepository.saveAll(imageList);
        };
    }
}