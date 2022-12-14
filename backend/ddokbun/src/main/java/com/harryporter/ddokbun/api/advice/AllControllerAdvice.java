package com.harryporter.ddokbun.api.advice;

import com.harryporter.ddokbun.api.response.ResponseFrame;
import com.harryporter.ddokbun.exception.ErrorCode;
import com.harryporter.ddokbun.exception.GeneralException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class AllControllerAdvice {



    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<?> MethodArgumentNotValidHadler(MethodArgumentNotValidException me){
        BindingResult bindingResult = me.getBindingResult();

        StringBuilder builder = new StringBuilder();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            builder.append("[");
            builder.append(fieldError.getField());
            builder.append("](은)는 ");
            builder.append(fieldError.getDefaultMessage());
            builder.append(" 입력된 값: [");
            builder.append(fieldError.getRejectedValue());
            builder.append("]");
        }
       String content =  builder.toString();

        ResponseFrame<String> responseFrame = new ResponseFrame<>();

        responseFrame.setMessage("사용자 입력값 에러 발생"); //메세지
        responseFrame.setState(0); //심플 성공 실패 상태
        responseFrame.setCode(ErrorCode.BAD_REQUEST.getCode()); //우리가 지정한 코드
        responseFrame.setContent(content);

        return new ResponseEntity<>(responseFrame,ErrorCode.BAD_REQUEST.getHttpStatus());
    }

    //
    @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> MethodArgumentTypeMismatchHandler(MethodArgumentTypeMismatchException me){

        ResponseFrame<String> responseFrame = new ResponseFrame<>();
        responseFrame.setMessage(ErrorCode.BAD_REQUEST.getMessage()); //메세지
        responseFrame.setState(0); //심플 성공 실패 상태
        responseFrame.setCode(ErrorCode.BAD_REQUEST.getCode()); //우리가 지정한 코드
        responseFrame.setContent(me.getMessage());
        return new ResponseEntity<>(responseFrame,ErrorCode.BAD_REQUEST.getHttpStatus());
    }

    @ExceptionHandler(value = GeneralException.class)
    public ResponseEntity<?> genericExceptionHandler(GeneralException ge){

        ResponseFrame<Throwable> responseFrame = new ResponseFrame<>();

        responseFrame.setMessage(ge.getMessage()); //메세지
        responseFrame.setState(0); //심플 성공 실패 상태
        responseFrame.setCode(ge.getErrorCode().getCode()); //우리가 지정한 코드
        responseFrame.setContent(ge.getCause());

        return new ResponseEntity<>(responseFrame,ge.getErrorCode().getHttpStatus());
    }


}
