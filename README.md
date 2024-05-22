# Weather Tracking API

## Objective
Implement a REST API for a weather tracking system with data persistence and integration with a third-party weather API.

You have total control over frameworks, tools, and libraries. Consider the Evaluation Criteria, but also try to have fun — this isn't a test of the _right_ or _wrong_ approach; it's about getting an understanding of _your_ individual approach.

## Requirements
- Fork this repository.
- Implement the following REST API endpoints:
  - `POST /cities`: Add a new city to track.
  - `GET /cities`: Retrieve a list of all tracked cities.
  - `GET /cities/:id`: Retrieve details of a specific city by ID.
  - `PUT /cities/:id`: Update details of a specific city by ID.
  - `DELETE /cities/:id`: Delete a city by ID.
  - `GET /cities/:id/weather`: Retrieve the current weather for a specific city by ID using a third-party weather API.
- Persist city data using a datastore of your choice.
- Fetch current weather information from a third-party weather API.
- Write tests for the API endpoints.
- Ensure the code is well-documented and follows best practices.

## Getting Started
1. Fork this repository and complete the implementation.
2. Submit a pull request with your completed project.

## Evaluation Criteria
- Conformance to business requirements
- Code quality and organization
- Proper use of modern development practices
- Effective error handling and validation
- Quality and coverage of tests
- Use of Git and commit messages
- Documentation and clarity in the README

🚀 Happy coding!
