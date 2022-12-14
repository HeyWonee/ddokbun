package com.harryporter.ddokbun.utils.auth;

import com.harryporter.ddokbun.domain.user.dto.UserAthentication;
import com.harryporter.ddokbun.domain.user.dto.UserDto;
import com.harryporter.ddokbun.domain.user.service.UserService;
import com.harryporter.ddokbun.exception.ErrorCode;
import com.harryporter.ddokbun.exception.GeneralException;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenUtils {
    private static String secretKey = "happybirthday";
    private static final Long expiredTime = 1000 * 60L * 60L * 1000L; // 유효시간 3시간
    private final UserService userService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public static String generateJwtToken(UserDto user) {
        return Jwts.builder()
                .setSubject(String.valueOf(user.getUserSeq()))
                .setHeader(createHeader()) //헤더
                .setClaims(createClaims(user)) // 클레임, 토큰에 포함될 정보
                .setExpiration(new Date(System.currentTimeMillis() + expiredTime)) //만료일
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    private static Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    private static Map<String, Object> createClaims(UserDto user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userSeq", user.getUserSeq()); // userSeq
        claims.put("userNickname", user.getUserNickname()); // 닉네임
        claims.put("userEmail", user.getUserEmail()); // 이메일
        claims.put("role", user.getUserRole()); // 권한
        return claims;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = getTokenClaims(token);
        if(claims == null)
            throw new GeneralException(ErrorCode.DATA_ACCESS_ERROR, "사용자 인증 정보를 불러올 수 없습니다");
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(new String[]{claims.get("role").toString()})
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDto userDto = userService.loadUserByUserSeq(getUserSeq(token));
        UserAthentication userAthentication = new UserAthentication();

        userAthentication.setAuthenticated(true);
        userAthentication.setUserEmail(userDto.getUserEmail());
        userAthentication.setUserNickname(userDto.getUserNickname());
        userAthentication.setUserRole(userDto.getUserRole());
        userAthentication.setUserSeq(userDto.getUserSeq());


        return userAthentication;
    }

    private Claims getTokenClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        } catch (SecurityException e) {
            log.info("Invalid JWT signature.");
     //       throw new GeneralException(ErrorCode.VALIDATION_ERROR,"Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
     //       throw new GeneralException(ErrorCode.VALIDATION_ERROR,"Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.---------------");
            throw new GeneralException(ErrorCode.VALIDATION_ERROR,"Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
       //     throw new GeneralException(ErrorCode.VALIDATION_ERROR,"Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        //    throw new GeneralException(ErrorCode.VALIDATION_ERROR,"JWT token compact of handler are invalid.");
        }
        return null;
    }

    public boolean validateToken(String jwtToken) {
        try {
            Claims claims = getTokenClaims(jwtToken);
            if (claims == null)
                return false;
            return !claims.getExpiration().before(new Date());
        }catch (Exception e){
            return false;
        }
    }

    private Long getUserSeq(String jwtToken) {
        Claims claims = getTokenClaims(jwtToken);
        if (claims == null)
            throw new GeneralException(ErrorCode.DATA_ACCESS_ERROR, "사용자 인증 정보를 불러올 수 없습니다");

        return Long.valueOf(String.valueOf(getTokenClaims(jwtToken).get("userSeq")));
    }

    public Long getUserSeq(HttpServletRequest request){
        String jwtToken = request.getHeader("Auth");
        return getUserSeq(jwtToken);
    }

}
