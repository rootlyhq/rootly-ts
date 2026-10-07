# Changelog

## [Unreleased]

### Added

- **Meeting Recordings API** — Full CRUD and lifecycle management for incident meeting recordings
  - `GET /v1/incidents/{incident_id}/meeting_recordings` — List recordings for an incident
  - `POST /v1/incidents/{incident_id}/meeting_recordings` — Invite a recording bot to a meeting
  - `GET /v1/meeting_recordings/{id}` — Get a single recording
  - `DELETE /v1/meeting_recordings/{id}` — Delete a recording
  - `DELETE /v1/meeting_recordings/{id}/delete_video` — Delete only the video file (preserves transcript/metadata)
  - `POST /v1/meeting_recordings/{id}/pause` — Pause an active recording
  - `POST /v1/meeting_recordings/{id}/resume` — Resume a paused recording
  - `POST /v1/meeting_recordings/{id}/stop` — Stop a recording session
  - `POST /v1/meeting_recordings/{id}/leave` — Remove the bot from the meeting
- `MeetingRecording` and `MeetingRecordingList` type aliases
- **Alert Configuration API**
  - `GET /v1/alert_configuration` — Get the team's alert configuration
  - `PUT /v1/alert_configuration` — Update the team's alert configuration
- **Private Agents API**
  - `POST /v1/private_agents/enrollment_tokens` — Create an enrollment token
  - `GET /v1/private_agents` — List private agents
  - `GET` and `PATCH /v1/private_agents/{id}` — Get or update a private agent
  - `POST /v1/private_agents/{id}/revoke` — Revoke a private agent
- **Problems API**
  - `GET` and `POST /v1/problems` — List or create problems
  - `GET`, `PUT`, and `DELETE /v1/problems/{id}` — Get, update, or delete a problem
  - `POST /v1/problems/{id}/incidents` and `DELETE /v1/problems/{id}/incidents/{incident_id}` — Link or unlink an incident
  - `GET` and `POST /v1/problems/{problem_id}/action_items` — List or create a problem action item
  - `GET`, `PUT`, and `DELETE /v1/problem_action_items/{id}` — Get, update, or delete a problem action item
- **Status Page Teams API**
  - `GET` and `POST /v1/status-pages/{status_page_id}/teams` — List or add a team
  - `GET`, `PUT`, and `DELETE /v1/status-pages/{status_page_id}/teams/{id}` — Get, update, or remove a team
- Phone number verification endpoints: `POST /v1/phone_numbers/{id}/verify` and `POST /v1/phone_numbers/{id}/resend_verification`
- New type aliases for alert configuration, private agents, problems and problem action items, status page teams, `AcknowledgeAlert`, `NullableSeverityResponse`, and `OverriddenShift`

### Changed

- `Alerts::Source` added to audit log `item_type` enum
- Dashboard `group_by.key` now supports `"alert_field"` in addition to `"custom_field"` and `"incident_role"`
- On-call shadow delete description updated: active shadows have end time truncated instead of hard-delete
- On-call shadow response includes `is_shadow` field
- SLA manager supports `manager_user_id` as alternative to `manager_role_id`
- Form field supports `auto_set_by_catalog_property_id`
- Workflow form field conditions support `environment_ids` for non-environment form fields
- Form fields include `native_field_ids`
- Alert writes support actor attribution by email or user ID; alert responses include Slack notification metadata and acknowledgement/resolution timestamps
- Alert event actions include `retrigger_cancelled`, `team_attached_from_payload`, and `user_paged`, with additional page-reason and Slack message fields
- Alert routing condition fields are required, and alert urgency re-trigger timeouts use a finite set of supported values
- Incidents include Linear issue identifiers and URLs; playbooks support `kind`, `content`, and `cause_ids`
- Schedules expose `time_zone` and `business_hours`; teams expose SCIM IDs and `schedule_override_policy`
- Roles include private-agent and status-page update permissions; workflows expose per-resource execution, group assignment, and failure-notification settings
- Webhook event types include `shift.ended`

### Removed

- Alert re-trigger rule endpoints and their type aliases
- Bulk import endpoints and their type aliases

### Dependencies

- Updated dev dependencies to tsx `^4.23.15` and vitest `^5.0.3`; kept TypeScript at `^5.9.3` because `openapi-typescript` currently requires TypeScript `^5.x`
