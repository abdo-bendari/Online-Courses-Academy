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
  <li><strong>Payments</strong>: Payment integration is included to handle course fees, supporting methods such as credit cards and PayPal. The platform handles payment transactions securely, ensuring that course access is granted once payment is confirmed.</li>
  <li><strong>Certificates</strong>: Upon successful completion of a course, students are awarded certificates that they can download and share. The certificates include details such as the course name, instructor, and completion date.</li>
  <li><strong>Reviews & Ratings</strong>: Users can rate and review courses to help other students make informed decisions. Each course can be rated, and feedback can be provided on course content, instructors, and overall learning experience.</li>
  <li><strong>Role-Based Access Control (RBAC)</strong>: The platform supports different user roles such as students, instructors, and administrators. Each role has specific permissions to ensure proper access control across the platform.</li>
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

## API Endpoints

### Authentication

- **POST /signUp**: Registers a new user. Ensures the email is unique and the data is validated using `addUserSchema`.
- **POST /signIn**: Authenticates a user with email and password. Returns a JWT token for further use.
- **PATCH /**: Updates the user's password after validating the old password. Requires email and new password in the request body.

### User Management

- **GET /users/:id**: Fetches user profile by user ID. Requires authentication.
- **PUT /users/**: Updates the user's profile. Accessible only to users with the role `student`.
- **DELETE /users/:id**: Deletes a user account by user ID. Accessible only to users with the role `admin`.
- **GET /users/**: Retrieves a list of all users. Accessible only to users with the role `admin`.

### Course Management

- **POST /courses/**: Creates a new course. Requires authentication with `admin` role and uploads files for the course materials.
- **GET /courses/**: Retrieves all courses.
- **GET /courses/:id**: Fetches a single course by ID.
- **PUT /courses/:id**: Updates a course by ID. Accessible to users with `instructor` or `admin` role.
- **DELETE /courses/:id**: Deletes a course by ID. Accessible only to users with `admin` role.

### Assignment Management

- **POST /assignments/**: Creates a new assignment for a course. Requires authentication with `instructor` role.
- **GET /assignments/**: Retrieves all assignments.
- **GET /assignments/:id**: Fetches an individual assignment by ID.
- **PUT /assignments/:id**: Updates an assignment by ID. Accessible to users with `instructor` role.
- **DELETE /assignments/:id**: Deletes an assignment by ID. Accessible only to users with `instructor` or `admin` role.

### Payment Management

- **POST /payments/**: Creates a new payment. Requires authentication and validates payment details.
- **GET /payments/**: Retrieves all payments. Accessible to users with `admin` role.
- **PATCH /payments/:id**: Updates payment status. Accessible to users with `admin` role.
- **DELETE /payments/:id**: Deletes a payment by ID. Accessible only to users with `admin` role.

### Rating & Review Management

- **POST /ratings/**: Adds a rating for a course or lecture. Requires authentication.
- **GET /ratings/**: Retrieves all ratings for a course or lecture.
- **POST /reviews/**: Adds a review for a course or instructor. Requires authentication.
- **GET /reviews/**: Retrieves all reviews for a course or instructor.

### Submission Management

- **POST /submissions/**: Allows students to submit assignments. Requires authentication with `student` role.
- **GET /submissions/:id**: Fetches a submission by ID.
- **PATCH /submissions/:id**: Updates a submission with grade and feedback. Accessible to users with `instructor` role.

### Inquiry Management

- **POST /inquiries/**: Allows students to submit inquiries to instructors or support. Requires authentication.
- **GET /inquiries/**: Retrieves all inquiries.

### Certificate Management

- **GET /certificates/:userId**: Retrieves certificates for a given user.

## Key Takeaways from this Project

Course Platform is a robust, user-friendly platform designed to deliver high-quality online education. With features like course enrollment, assignment submissions, payment management, and certification issuance, the platform aims to provide a seamless learning experience. Secure user authentication and authorization ensure that access to resources is role-based, while data validation maintains the integrity of user inputs. The project utilizes technologies like TypeScript, JWT, MySQL, and Sequelize, offering a scalable solution for online learning.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
