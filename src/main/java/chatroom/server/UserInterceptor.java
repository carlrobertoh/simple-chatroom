package chatroom.server;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.security.Principal;
import java.util.List;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;

class UserInterceptor implements ChannelInterceptor {

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
    if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
      Object raw = message.getHeaders().get(SimpMessageHeaderAccessor.NATIVE_HEADERS);
      try {
        ObjectMapper objectMapper = new ObjectMapper();
        accessor.setUser(new UserPrincipal(objectMapper.readValue(
            objectMapper.writeValueAsString(raw), StompHeaderUser.class).getUsername().get(0)));
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    return message;
  }

  @JsonIgnoreProperties(ignoreUnknown = true)
  private static class StompHeaderUser {

    private List<String> username;

    public List<String> getUsername() {
      return username;
    }

    public void setUsername(List<String> username) {
      this.username = username;
    }
  }

  private static class UserPrincipal implements Principal {

    private final String name;

    private UserPrincipal(String name) {
      this.name = name;
    }

    @Override
    public String getName() {
      return name;
    }
  }
}
