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

### Changed

- `Alerts::Source` added to audit log `item_type` enum
- Dashboard `group_by.key` now supports `"alert_field"` in addition to `"custom_field"` and `"incident_role"`
- On-call shadow delete description updated: active shadows have end time truncated instead of hard-delete
- On-call shadow response includes `is_shadow` field
- SLA manager supports `manager_user_id` as alternative to `manager_role_id`
- Form field supports `auto_set_by_catalog_property_id`
- Workflow form field conditions support `environment_ids` for non-environment form fields
- Form fields include `native_field_ids`

