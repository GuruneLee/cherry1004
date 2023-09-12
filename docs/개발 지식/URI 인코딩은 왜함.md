uri, url

- api로 자원을 요청할 때 써야함
- 브라우저 url 창에 입력됨 / 입력하여 이동
  -> 본질적으론 같은거임 (RESTFul API 에 대해서도 알아보자)

인코딩 하는 이유 (URL 은 특정 ASCII 문자 집합만을 사용해야한다)

- url 을 구성하는 문자열 set 이 ASCII 이여야 함
  - ASCII 가 아닌 한글 등은 인코딩 되어야 함
- url 에서 특별한 의미를 가진 예약어가 있다
  - escape 처리 해줘야 한다
- url 에서 사용할 수 없는 ' '(white space) 같은 문자가 있다
  - escape 처리 해줘야 한다

(google maps platform - url 인코딩 발췌)
| Set | 문자 | URL usage |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Alphanumeric | a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9 | Text strings, scheme usage (http), port (8080), etc. |
| Unreserved | - \_ . ~ | Text strings |
| Reserved | ! \* ' ( ) ; : @ & = + $ , / ? % # [ ] | Control characters and/or Text Strings |

ref

- [URL 인코딩이 필요한 이유](https://change-words.tistory.com/entry/URL-%EC%9D%B8%EC%BD%94%EB%94%A9-%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B4%EC%9C%A0#:~:text=%EC%9D%B8%EC%BD%94%EB%94%A9%EC%9D%B4%20%ED%95%84%EC%9A%94%ED%95%9C%20%EC%9D%B4%EC%9C%A0%EB%A5%BC,%EC%9D%B8%EC%BD%94%EB%94%A9%EC%9D%B4%20%ED%95%84%EC%9A%94%ED%95%A0%20%EC%88%98%20%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4.)
- [Google Maps Platform - URL 인코딩](https://developers.google.com/maps/url-encoding?hl=ko)
- [RFC3986. Uniform Resource Identifier (URI): Generic Syntax - Chracters](https://datatracker.ietf.org/doc/html/rfc3986#section-2)
