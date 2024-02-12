
# ShelterLink  🔗🐶🐱🏠

ShelterLink addresses a significant challenge currently prevalent in Texas, where pet owners are releasing or surrendering their animals to shelters, leading to overcapacity issues post-pandemic. Inspired by platforms like Petfinder, ShelterLink offers a suite of features including pet searching, community forums, and discussions to mitigate this issue and create a supportive community of pet lovers.

# Index 📖
1. [Technologies Used](#technologies-used)
2. [Project Description](#project-description)
3. [Project Design](#project-design)
4. [Project Walkthrough](#project-walkthrough)
5. [Project Potential and Use](#project-potential-and-use)
6. [Areas for Improvement](#areas-for-improvement)
7. [Lessons Learned](#lessons-learned)

## The problem <a name="problem"></a> 😥
 - Many animal shelters in Texas are operating under code Red due to overcrowding, only accepting hurt or sick animals, after experiencing a record number of intakes after the pandemic.
<img width="384" alt="Screenshot 2024-02-10 at 6 27 03 PM" src="https://github.com/yannellym/ShelterLink/assets/91508647/d4c6b4d4-331f-4534-bf85-b3d9f848073c">


## A way to help</a> 🙏
 Due to this crisis, I decided to develop an app aimed at facilitating the adoption process and connecting animals with loving forever homes. The app's mission extends beyond adoption, fostering a supportive community dedicated to addressing the challenges faced by animal shelters and advocating for animal welfare.


## Hosted site on AWS:
- https://www.shelterlinkbestfriend.com/

- ShelterLink App Preview:

https://github.com/yannellym/ShelterLink/assets/91508647/025d9b9a-3de5-4a49-a25f-5c808d9c69d4

- ShelterLink Advertisement:

https://github.com/yannellym/ShelterLink/assets/91508647/421be789-bb77-4a56-bb81-1e13f400d77e

## Technologies Used <a name="technologies-used"></a> 💻

### Frontend 👩🏽‍💻
- **React**: The frontend of ShelterLink is built using React, a popular JavaScript library for building user interfaces.
- **React Hooks**: Leveraging React Hooks for state management and side effects, enabling a more modular and efficient codebase.
- **Custom Hooks**: Custom React Hooks are used for reusable logic across components, promoting code reusability.
- **Axios**: Axios is used for making HTTP requests to the backend API, facilitating data retrieval and interaction.
- **GraphQL Subscriptions**: Implementing GraphQL subscriptions allows for real-time updates and reduces the need for frequent polling.
- **Lazy Loading**: Lazy loading is employed to improve performance by loading components asynchronously when needed.
- **Skeleton Loading**: Skeleton loading techniques are utilized to enhance user experience by providing visual placeholders while content is loading.
- **Font Awesome**: Font Awesome icons are used for enhancing the UI with scalable vector icons.
- **Figma**: Figma was used for prototypes and design iteration.
- **Chrome devTools**: Chrome DevTools was used to inspect, modify, and debug the app, test cache, and view storage.

### Backend (AWS Amplify) 💽
- **AWS Amplify**: The backend infrastructure is powered by AWS Amplify, providing a serverless architecture for scalability and cost-effectiveness.
- **Python**: Python is used for implementing backend logic and data processing.
- **GraphQL**: GraphQL is utilized for defining the API schema and querying data from the backend.
- **DynamoDB**: DynamoDB serves as the NoSQL database for storing pet information and community forum data, offering flexibility and scalability.
- **AWS Cognito**: AWS Cognito handles user authentication and authorization, ensuring secure access to the application.
- **AWS Lambda**: AWS Lambda functions are used for serverless compute logic, enabling event-driven backend processing.
- **API Gateway**: API Gateway serves as the entry point for the GraphQL API, enabling communication between the frontend and backend.
- **AWS CloudWatch**: CloudWatch provides monitoring and logging capabilities for the backend infrastructure, ensuring operational visibility.
- **AWS CloudFormation**: CloudFormation is used for infrastructure as code (IaC), enabling automated provisioning and management of AWS resources.
- **AWS Lambda@Edge**: Lambda@Edge is leveraged for serverless compute at the edge, enhancing performance and reducing latency.
- **AWS Pinpoint**: AWS Pinpoint is used for user engagement and analytics, providing insights into user behavior and interaction.
- **AWS AppSync**: AppSync facilitates real-time data synchronization and offline access for GraphQL APIs, enhancing the user experience.
- **AWS Route53**: Route53 for domain management. 

### External APIs ䷇
- **Nominatim**: Nominatim is used for geolocation services, enabling users to find nearby shelters and pet adoption centers.
- **Google APIs**: Various Google APIs including Places API, Maps JavaScript API, and Geocoding API are utilized for location-based services and mapping functionalities.
- **Unsplash API**: Unsplash API is used for fetching profile images and generating images for pets that do not have one, enhancing visual appeal.
- **Petfinder API**: Integrated to fetch information about pets available for adoption, fostering, and those already adopted.

### Continuous Integration/Continuous Deployment (CI/CD) 🚶🏽‍♂️
- **GitHub**: GitHub is utilized for version control and collaborative development, enabling seamless integration with CI/CD pipelines.
- **AWS CodePipeline**: AWS CodePipeline is leveraged for automating the build, test, and deployment process, ensuring efficient software delivery.

## Project Description <a name="project-description"></a> 📝

ShelterLink aims to streamline the process of pet adoption by providing users with a user-friendly platform to search for pets available for adoption from various shelters and rescue organizations. The application offers the following key features:

1. **Pet Searching** 🔍: Users can search for pets based on various criteria such as species, breed, age, and location. Advanced filtering options are available to narrow down search results.
   
2. **Community Forums** 💬: ShelterLink provides a community-driven platform where users can engage in discussions, share experiences, and seek advice from fellow pet owners and enthusiasts. Community forums facilitate knowledge sharing and community building among users.

3. **Real-Time Updates** 🔄: The application utilizes GraphQL subscriptions to provide real-time updates on pet availability, forum discussions, and other relevant activities, ensuring users stay informed about the latest events.

4. **User Profiles** 👤: Users can create profiles to personalize their experience, track their adoption journey, and participate in community forums. Profile images can be uploaded or fetched from external sources like Unsplash.

5. **Location Services** 🗺️: ShelterLink integrates with Nominatim and Google APIs to provide location-based services, enabling users to find nearby shelters and pet adoption centers easily.

6. **Responsive Design** 📱: The application is built with responsive design principles to ensure optimal user experience across devices and screen sizes, including desktops, tablets, and mobile phones.
   
7. **Email Shelter Feature** ✉️: ShelterLink includes a convenient feature that allows users to email the shelter about a pet they're interested in with just one click. The email is prebuilt, requiring users only to click send.
   
8. **Image Generation for Pets** 🖼️: ShelterLink incorporates a feature that generates images for pets that do not have an image available. This enhances the visual appeal of the platform and provides users with a more engaging experience while browsing for pets.

9. **Favorite Pets Feature** ⭐: ShelterLink allows users to save their favorite pets, enabling them to reference them later on. This feature enhances user experience by facilitating easy access to pets they are interested in adopting.

10. **Local Shelter Search** 🏠: Users can search for shelters around their location using ShelterLink. This functionality enables users to discover nearby shelters and pet adoption centers, making it convenient for them to explore adoption options in their area.

11. **Pet Matching Form** 📝: Users can fill out a form specifying their preferences for a pet. Based on the information provided, ShelterLink's algorithm matches users with pets that align with their preferences, facilitating personalized pet recommendations. This feature enhances the adoption process by helping users find pets that suit their lifestyle and preferences.
    
## Project Design <a name="project-design"></a> 🎨

   - [Mockup: Home page Example](https://www.figma.com/proto/P3CczV3ENL6Ozk9d3561Gs/Untitled?type=design&node-id=4-129&t=qcB6MlaAGqmgLxlV-0&scaling=scale-down&page-id=0%3A1):
     
   <img src="https://media.giphy.com/media/7j3BXbsXM5fBXCb7mU/giphy.gif" width=500>

   - [Wireframe: Home page Example](https://www.figma.com/proto/P3CczV3ENL6Ozk9d3561Gs/Untitled?type=design&node-id=1-3&t=qcB6MlaAGqmgLxlV-0&scaling=scale-down&page-id=0%3A1):
   
   <img src="https://media.giphy.com/media/H5fj1NPCOOq8GkwAcb/giphy.gif" width=500>

## Project Walkthrough and Functionality <a name="project-walkthrough"></a> 🎨

- Functionality: Find a pet that matches what you're looking for, and a find a pet by location and pet type:
    <img src="https://media.giphy.com/media/VXkIl2Eg2S0Hz0fAoy/giphy.gif" width=500>

- Functionality: Find all dogs, cats, & other pets around you, find shelters around you, and an example of skeletons for loading:
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGJyMWNrd3Y0NXdpdXFmMjVvaHk4NmlhbWtyZ3N4azEyNTltMnBsNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yHrnW2qeBBHKvM3JyT/giphy.gif" width=500>

- Functionality: Log in and log out, and find a pet by filtering through location, type, size, age, gender, size, breed, and coat. 
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmhjbTVwNjFvb3FuZnA4dDJ5eTFmaGZxd3R1dnd0c3U1dHI0cTYxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zkTO0YEknQHUPbkKKi/giphy.gif" width=500>

- Functionality: Get the pet's details and origin, share the pet, email the shelter with one click, and like/unlike a pet.
   <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm1jMTVkMGt0ajk2eDU4d3hxem5id3QzcW1laXZ5czN5bWl6eDc3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2DzsjOAVEGFiKwQ5p5/giphy.gif" width=500>

- Functionality: Visit forum, add a new topic, make a post, like/unlike a post, reply to a post, see the number of replies, read more.
   <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGgzdHpxZGViazMzejh0dWRqNnZ3MWZqOXFsdGp4eGlvOHN1czlhdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ox8Ur60as84yugsBkY/giphy.gif" width=500>

- Functionality: Responsiveness. The app is designed for mobile, tablets, and large screen devices. 
   <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjg1bmtiaW85dDI0d3RxYTg2MjI1amU4MnB6cW81ZnNnOXdsanNmcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pd05YauAZ1yPvfycNf/giphy.gif" width=500>

- Functionality: Skeleton loading. The app displays a skeleton loading screen as the items load.
   <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnh3N3hvMzdnY3hzdDk2YWJqbjhnZDZxYWl4YmZkZzRrdDBwcmswbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Rf0Agk0M0rY0KsBg5n/giphy.gif" width=500>



## Project Potential and Use <a name="project-potential-and-use"></a> 🏆

ShelterLink holds significant potential to revolutionize the pet adoption process and foster a vibrant community of pet lovers. Some of the key uses and potentials of the project include:

1. **Increased Pet Adoptions**: By providing users with a centralized platform to search for pets from various shelters, ShelterLink can help increase pet adoptions and reduce the number of animals in shelters.

2. **Community Engagement**: The community forums feature fosters engagement among users, allowing them to share stories, seek advice, and connect with like-minded individuals, thereby creating a supportive and active community.

3. **Educational Resource**: ShelterLink can serve as an educational resource for pet owners, offering valuable insights, tips, and resources on pet care, training, health, and behavior.

4. **Location-Based Services**: The integration of location-based services enables users to discover nearby shelters, pet-friendly venues, and community events, enhancing their overall experience and convenience.

5. **Real-Time Updates**: The use of GraphQL subscriptions ensures that users receive timely updates on pet availability, forum discussions, and community events, keeping them engaged and informed.

6. **Scalability and Extensibility**: With its serverless architecture and modular design, ShelterLink is highly scalable and extensible, allowing for future enhancements and additions to meet evolving user needs.

## Areas for Improvement <a name="areas-for-improvement"></a> 🤔

While ShelterLink offers a range of features and functionalities, there are several areas that could be improved to enhance the user experience and overall effectiveness of the platform:

1. **User Feedback Mechanism**: Implementing a user feedback mechanism such as ratings, reviews, and surveys can provide valuable insights into user preferences and satisfaction levels, enabling continuous improvement.

2. **Enhanced Search Functionality**: Improving the search functionality with advanced filters, predictive search suggestions, and intelligent matching algorithms can help users find pets more efficiently based on their preferences and criteria.

3. **Accessibility Features**: Incorporating accessibility features such as screen reader support, keyboard navigation, and high-contrast modes can make the application more inclusive and accessible to users with disabilities.

4. **Pet Matching Algorithms**: Developing sophisticated pet matching algorithms based on user preferences, lifestyle factors, and compatibility assessments can facilitate more accurate and personalized pet recommendations.

5. **Community Moderation Tools**: Implementing community moderation tools such as content moderation, user reporting, and community guidelines can help maintain a positive and safe environment within the community forums.

6. **Performance Optimization**: Conducting performance optimization techniques such as code splitting, lazy loading, and image optimization can improve the application's speed, responsiveness, and overall performance, especially on low-bandwidth or mobile devices.

## Lessons Learned <a name="lessons-learned"></a> 🧠

Throughout the development of ShelterLink, several valuable lessons were learned, including:

1. **Serverless Architecture**: Embracing serverless architecture with AWS Amplify offered scalability, cost-efficiency, and reduced operational overhead, but required careful planning and optimization for performance and resource utilization.

2. **GraphQL**: Adopting GraphQL for API development provided flexibility, efficiency, and real-time capabilities, but required a learning curve for schema design, resolver implementation, and subscription management.

3. **Community Engagement**: Fostering community engagement and collaboration through forums and discussions requires proactive moderation, community management, and responsive support to ensure a positive and constructive environment.

4. **User-Centric Design**: Prioritizing user-centric design principles such as accessibility, responsiveness, and intuitive navigation is essential for creating a seamless and enjoyable user experience that meets the diverse needs of users.

5. **Continuous Improvement**: Embracing a culture of continuous improvement, iteration, and feedback is crucial for evolving the platform, addressing user feedback, and staying relevant in a rapidly changing landscape.


ShelterLink has been quite the journey, giving me deep insights into pet adoption and community dynamics while honing my tech skills. Being responsible for both frontend and backend was tough, but it was a fantastic opportunity to flex my abilities and learn as I went. This project allowed me to put my AWS certifications into action and tackle real-world challenges head-on. 

Working solo meant I had to troubleshoot and innovate on my own. It was like diving into the deep end, but I learned to swim pretty fast. Each hurdle I faced turned into a chance to grow and learn something new. ShelterLink has been more than just a project; it's been a journey of self-discovery and skill-building that I'm proud of. Despite the challenges, I wouldn't trade this experience for anything!
