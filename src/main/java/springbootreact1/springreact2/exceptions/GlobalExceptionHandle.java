package springbootreact1.springreact2.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import springbootreact1.springreact2.dto.response.ApiResponseFailed;

@ControllerAdvice
public class GlobalExceptionHandle {
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ApiResponseFailed> handleException(Exception e) {
        return ResponseEntity.badRequest().body(ApiResponseFailed.builder().code("400").message(e.getMessage()).build());
    }
}
