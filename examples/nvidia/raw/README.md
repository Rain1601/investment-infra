# Raw source artifacts

Raw artifacts are immutable inputs. Large, licensed, or access-controlled files are not committed to Git.

For each artifact, commit metadata containing:

- document ID and source ID;
- original URI;
- publication and capture times;
- reporting period and information date;
- SHA-256 checksum;
- media type and version label;
- storage reference;
- license/access notes.

If an issuer revises a document, capture it as a new document and link it with `supersedes_id`. Never overwrite the earlier version.

The ignored `files/` directory may be used for local development copies.
