| **Permission**     | **Description**                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `channels:history` | Required to fetch the messages from the `#campus-screen` channel.                        |
| `emoji:read`       | Required for enriching messages that contain workspace-specific custom emojis.           |
| `files:read`       | Required for enriching messages with attachments.                                        |
| `users:read`       | Required for enriching messages with @ mentions.                                         |
| `channels:read`    | Required for enriching messages with # channel mentions.                                 |
| `reactions:write`  | Required for giving user feedback on whether a post has been published to the TV screen. |

**Note**: I understand that the `users:read` permission causes concern regarding user privacy, but this shouldn't be an issue. Even though my application will be a web app, it is intended for private internal use and will require Google Sign-In with a `@code.berlin` email.
