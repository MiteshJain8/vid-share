# About

A video sharing platform built using React Native.

## Features

- User authentication
- Video upload and playback
- User profiles
- Commenting on videos
- Liking and sharing videos

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/MiteshJain8/vid-share.git
    cd vid-share
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```properties
    endpoint=https://cloud.appwrite.io/v1
    projectId=YOUR_APPWRITE_PROJECT_ID
    platform=com.miteshjain8.vidshare
    databaseId=YOUR_APPWRITE_DATABASE_ID
    userCollectionId=YOUR_APPWRITE_USER_COLLECTION_ID
    videoCollectionId=YOUR_APPWRITE_VIDEO_COLLECTION_ID
    storageId=YOUR_APPWRITE_STORAGE_ID
    ```

## Usage

- To start the development server:
    ```sh
    npm start
    ```

- To run on Android:
    ```sh
    npm run android
    ```

- To run on iOS:
    ```sh
    npm run ios
    ```

- To run on web:
    ```sh
    npm run web
    ```

## Testing

To run tests:
```sh
npm test
```

## Linting

To lint the code:
```sh
npm run lint
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
