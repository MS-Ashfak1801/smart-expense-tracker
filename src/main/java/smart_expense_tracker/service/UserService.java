package smart_expense_tracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import smart_expense_tracker.dto.LoginRequest;
import smart_expense_tracker.dto.LoginResponse;
import smart_expense_tracker.model.User;
import smart_expense_tracker.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public User saveUser(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public LoginResponse login(LoginRequest request) {

        Optional<User> userOptional =
                userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return new LoginResponse(
                    null,
                    "User not found"
            );
        }

        User user = userOptional.get();

        if (passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            String token = jwtService.generateToken(
                    user.getEmail()
            );

            return new LoginResponse(
                    token,
                    "Login Successful"
            );
        }

        return new LoginResponse(
                null,
                "Invalid Password"
        );
    }
}