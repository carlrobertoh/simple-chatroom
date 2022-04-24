package chatroom.server;

import java.security.Principal;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class MessageController {

  @MessageMapping("v1/messages")
  @SendTo("/topic/messages")
  public ServerMessage sendMessage(SimpMessageHeaderAccessor headerAccessor, @Payload UserMessage message) {
    Principal user = headerAccessor.getUser();
    if (user == null) {
      throw new IllegalArgumentException();
    }
    return new ServerMessage(HtmlUtils.htmlEscape(message.getText()), user.getName());
  }

  private static class UserMessage {

    private String id;
    private String text;

    public String getId() {
      return id;
    }

    public void setId(String id) {
      this.id = id;
    }

    public String getText() {
      return text;
    }

    public void setText(String text) {
      this.text = text;
    }
  }
}


