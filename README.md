# About

Course Platform is a comprehensive online platform designed to make learning more accessible and engaging. It enables users to explore a variety of courses across different domains, enroll easily, and track their learning journey. This platform is tailored to cater to both students and instructors, providing a structured and seamless experience for accessing educational content, submitting assignments, and receiving certifications upon successful course completion.
The Course Platform emphasizes flexibility and user-friendliness, ensuring learners can engage with high-quality educational resources at their convenience. It also includes advanced features to enhance the learning experience, such as real-time progress tracking, interactive materials, and tools to foster collaboration between students and instructors.
## Features

<ul>
  <li><strong>User Authentication</strong>: Secure sign-up and login processes with encrypted passwords to protect user data. We use JWT (JSON Web Tokens) for secure authentication, allowing users to safely log in and access their accounts.</li>
  <li><strong>Course Catalog</strong>: A wide variety of courses available for students to browse, categorized by subject, difficulty, and other filters. Courses are stored with detailed metadata, including course description, instructors, pricing, and available materials.</li>
  <li><strong>Enrollment</strong>: Students can enroll in courses with a few clicks, and after enrollment, they gain access to the lectures, assignments, and learning materials associated with the course.</li>
  <li><strong>Lectures</strong>: Organized course content delivered through video lectures, with the ability to track progress. Students can watch videos, pause, and resume, as well as mark their progress to return later to continue their learning journey.</li>
  <li><strong>Assignments</strong>: Students can complete and submit assignments related to the courses they are enrolled in. The system supports assignment grading, feedback from instructors, and resubmission in case of revisions.</li>
  <li><strong>Assignment Submission and Feedback</strong>: Students can easily submit their assignments through the platform, receive grades, and view detailed feedback from instructors to enhance their learning experience.</li>
  <li><strong>Notifications and Completion Certificates</strong>: The platform sends real-time notifications to users about important updates, such as new lectures, upcoming assignments, and deadlines. Upon successful course completion, students are awarded a certificate that can be shared on professional networks.</li>
  <li><strong>Payments</strong>: Payment integration is included to handle course fees, supporting methods such as credit cards and PayPal. The platform handles payment transactions securely, ensuring that course access is granted once payment is confirmed.</li>
  <li><strong>Certificates</strong>: Upon successful completion of a course, students are awarded certificates that they can download and share. The certificates include details such as the course name, instructor, and completion date.</li>
  <li><strong>Reviews & Ratings</strong>: Users can rate and review courses to help other students make informed decisions. Each course can be rated, and feedback can be provided on course content, instructors, and overall learning experience.</li>
  <li><strong>Inquiry System</strong>: Students can submit inquiries to instructors or support teams for assistance. This system ensures that students can get help when they need it, ensuring a smooth learning experience.</li>
  <li><strong>Admin Panel</strong>: Admins can manage users, courses, assignments, and payments through a powerful dashboard. Admins have full control over the platform, including content management, user management, and transaction oversight.</li>
  <li><strong>Security Features</strong>: We implemented Helmet to secure HTTP headers and other security practices to prevent attacks like cross-site scripting (XSS) and SQL injection.</li>
  <li><strong>Data Validation</strong>: Joi validation is used to ensure that all user inputs, including course enrollment and payment details, are valid. This ensures that data is correctly formatted and prevents errors in the system.</li>
</ul>

## Using

The platform is built with the following technologies:

- **MySQL**: For relational database management. MySQL is used to store all essential data, including user profiles, courses, assignments, payments, and reviews. We chose MySQL due to its stability, performance, and scalability.
- **Sequelize ORM**: To interact with the MySQL database. Sequelize provides a simple way to define models, query the database, and handle relationships between entities (such as users, courses, and payments) with ease.
- **JavaScript**: For better type safety and a more structured, scalable codebase.
- **Express.js**: Web framework for building robust APIs.
- **Helmet**: Security middleware for securing HTTP headers.
- **Morgan**: HTTP request logger for API requests.
- **JWT Authentication**: Used for securing user authentication.
- **bcrypt**: Used to hash passwords before storing them in the database.
- **Joi**: For validating API inputs to ensure data integrity.
- **dotenv**: For managing environment variables.
- **CORS**: To enable secure communication between the client and API.

## Collections

The project uses several collections to store data related to users, courses, payments, and other essential information. Below are the key collections used in the platform:

- **Users**: Stores user details such as name, email, password, role (student, instructor, admin), and enrollment history.
- **Courses**: Contains course information including course name, description, instructor, price, and associated lectures.
- **Lectures**: Stores individual lecture details, including title, video URL, and course association.
- **Assignments**: Contains information about assignments for each course, including the assignment title, description, and due date.
- **Payments**: Tracks user payments for courses, including payment method, amount, and status.
- **Ratings**: Stores ratings given by students for courses and lectures.
- **Reviews**: Allows students to leave written reviews for courses and instructors.
- **Submissions**: Tracks student submissions for assignments, including grade and feedback from instructors.
- **Inquiries**: Stores inquiries made by students to instructors or support teams.
- **Certificates**: Contains information about issued certificates for completed courses, including the issue date and certificate URL.

# API Endpoints Documentation

This document provides a detailed description of all available API endpoints for the platform.

## Auth API

### `POST /auth/signUp`
- **Description**: Registers a new user in the system. This endpoint requires the user's details, including a unique email and password. The system checks if the email is already in use before completing the registration.

### `POST /auth/signIn`
- **Description**: Authenticates a user and generates a token. The user must provide their email and password. Upon successful authentication, the user will receive a JWT token for future requests.

### `PATCH /auth`
- **Description**: Allows a user to change their password. This action requires the user to provide the old password and the new one for security reasons.

---

## User API

### `PUT /users/:id`
- **Description**: Updates user information based on the user ID. The user must be authenticated and have proper permissions to modify their own data.

### `DELETE /users/:id`
- **Description**: Deletes a user from the system. Only admins have permission to perform this action. The user specified by the `id` will be permanently removed.

### `GET /users/:id`
- **Description**: Retrieves the details of a specific user by their ID. This endpoint requires the user to be authenticated.

### `GET /users`
- **Description**: Fetches all users from the system. Accessible only by authenticated admins.

### `POST /users/enroll`
- **Description**: Enrolls a user in a specific course. This action requires that the user is logged in and authorized to enroll.

### `POST /users/complete`
- **Description**: Marks a course as completed for the user. The user must have successfully finished the course to use this endpoint.

### `POST /users/notification`
- **Description**: Sends notifications to users. This feature is typically used by admins to inform users about important updates.

---

## Course API

### `POST /courses`
- **Description**: Creates a new course in the system. This endpoint is restricted to admin users, who must provide details such as the course title, description, and content.

### `PUT /courses/:id`
- **Description**: Updates course details for a specific course ID. Admin users are allowed to modify course information, such as description and content.

### `DELETE /courses/:id`
- **Description**: Deletes a course by its ID. Admin privileges are required to delete a course from the system.

### `GET /courses/:id`
- **Description**: Fetches the details of a specific course using the course ID. All authenticated users can access course details.

### `GET /courses`
- **Description**: Retrieves a list of all courses available in the system. Access is restricted to authenticated users.

### `GET /courses/filter`
- **Description**: Filters courses based on certain criteria like category or difficulty level. This is useful for users to find courses matching their preferences.

### `GET /courses/userCourses`
- **Description**: Retrieves all courses enrolled by the current user. This endpoint helps users to track their progress.

### `GET /courses/search`
- **Description**: Searches for courses based on keywords or categories. It helps users quickly find relevant courses in the system.

---

## Enrollment API

### `POST /enrollments`
- **Description**: Allows users to enroll in a course. This endpoint requires authentication and is generally used by students to sign up for available courses.

### `PUT /enrollments/:id/status`
- **Description**: Updates the enrollment status for a specific course enrollment. This can include changing the enrollment to completed or withdrawn.

### `GET /enrollments/userEnrollments`
- **Description**: Retrieves all course enrollments for a specific user. This endpoint helps users track their current courses.

---

## Inquiry API

### `POST /inquiries`
- **Description**: Submits an inquiry or question about a course or topic. Users can use this feature to ask for more information.

### `GET /inquiries/forUser`
- **Description**: Retrieves inquiries made by a specific user. This is available only to admins to help them manage and respond to user inquiries.

### `GET /inquiries/forCourse/:courseId`
- **Description**: Fetches inquiries related to a specific course. This helps admins or instructors respond to questions about the course content.

### `DELETE /inquiries/:id`
- **Description**: Deletes a specific inquiry from the system. Admins have permission to remove any inquiry.

---

## Lecture API

### `POST /lectures`
- **Description**: Adds a new lecture to a course. This is restricted to instructors who can add content to their assigned courses.

### `GET /lectures/lectures/:id`
- **Description**: Retrieves details about a specific lecture using its ID. All authenticated users can access lecture details.

### `PUT /lectures/:id`
- **Description**: Updates the content or details of a specific lecture. Only instructors have permission to modify lecture content.

### `DELETE /lectures/:id`
- **Description**: Deletes a lecture from a course. Instructors can delete their lectures from courses they are assigned to.

### `GET /lectures/:courseId`
- **Description**: Fetches all lectures for a specific course. Useful for students to view available content within a course.

---

## Payment API

### `POST /payments`
- **Description**: Processes a payment for a course. Only students can initiate a payment for enrolling in a course.

### `GET /payments`
- **Description**: Retrieves all payment records in the system. Only admins have access to this data for auditing and reporting purposes.

### `PUT /payments/:id`
- **Description**: Updates the status of a payment. Admins can mark payments as completed or failed based on the payment gateway response.

### `DELETE /payments/:id`
- **Description**: Deletes a specific payment record. Admins can remove incorrect or cancelled payments from the system.

---

## Rating API

### `POST /ratings`
- **Description**: Adds a rating for a specific course. Users can rate courses based on their experience after completing the course.

### `GET /ratings/:courseId`
- **Description**: Fetches the ratings for a specific course. This allows potential students to evaluate the course based on others' feedback.

### `DELETE /ratings/:id`
- **Description**: Deletes a rating for a course. Only admins are allowed to remove a course rating.

---

## Review API

### `POST /reviews`
- **Description**: Adds a review for a specific course. Reviews typically include feedback on the course content and instructor performance.

### `GET /reviews/:courseId`
- **Description**: Retrieves all reviews for a given course. Users can read reviews before enrolling in a course.

### `PUT /reviews/:id`
- **Description**: Updates a specific review. Admins or the user who submitted the review can modify their review content.

### `DELETE /reviews/:id`
- **Description**: Deletes a specific review. Admins have the ability to remove any review from the system.

---

## Submission API

### `POST /submissions/:assignmentId`
- **Description**: Submits an assignment for grading. Students can upload their assignments related to a specific course or module.

### `PUT /submissions/:submissionId`
- **Description**: Grades a specific assignment submission. Instructors can provide grades and feedback for student submissions.

### `GET /submissions/assignment/:assignmentId`
- **Description**: Fetches all submissions for a specific assignment. Useful for instructors to view all student submissions.

### `GET /submissions/user/:userId`
- **Description**: Retrieves all assignment submissions made by a specific user. This helps instructors track a student's performance.

---

## Certificate API

### `POST /certificates`
- **Description**: Issues a certificate for a user upon course completion. Instructors or admins can generate certificates for students who successfully complete a course.

### `GET /certificates`
- **Description**: Fetches all certificates issued to users. Only admins can access this data to verify student achievements.

### `DELETE /certificates/:id`
- **Description**: Deletes a specific certificate. Instructors or admins can revoke certificates if necessary.

---

## Assignment API

### `POST /assignments`
- **Description**: Adds a new assignment for a course. Instructors can create assignments for their students to complete.

### `GET /assignments/:courseId`
- **Description**: Retrieves all assignments for a specific course. Students can view the assignments they need to complete.

### `PUT /assignments/:id`
- **Description**: Updates the details of an assignment. Instructors can modify assignments, such as changing deadlines or questions.

### `DELETE /assignments/:id`
- **Description**: Deletes an assignment. Only instructors can remove assignments from a course.



## Key Takeaways from this Project

Course Platform is a robust, user-friendly platform designed to deliver high-quality online education. With features like course enrollment, assignment submissions, payment management, and certification issuance, the platform aims to provide a seamless learning experience. Secure user authentication and authorization ensure that access to resources is role-based, while data validation maintains the integrity of user inputs. The project utilizes technologies like Helmet, Morgan, JWT, MySQL, and Sequelize, offering a scalable solution for online learning.

## Project Inspiration

This project was inspired by the growing demand for accessible and efficient online learning platforms. The goal was to create an intuitive, scalable solution that provides students with the ability to enroll, complete courses, and earn certificates, while also allowing instructors to manage their content seamlessly. The platform is designed to streamline the learning process and foster a community where learners can grow, develop new skills, and engage with educational content in a meaningful way.

