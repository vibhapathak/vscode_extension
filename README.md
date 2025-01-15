# Boilerplate Generator

A Visual Studio Code extension to quickly generate multiple template files with boilerplate code.

## Features

- Create multiple files at once using comma-separated names
- Support for multiple template types:
  - JavaScript
  - React Components
  - HTML
- Right-click on any folder to create templates
- Automatically opens created files
- Prevents accidental file overwrites

## Usage

1. Right-click on a folder in the Explorer
2. Select "Create Template File"
3. Enter file names separated by commas (e.g., "Button, Navbar, Footer")
4. Select the template type
5. Files will be created and opened automatically

## Template Types

### React Component
```jsx
import React from 'react';

const ComponentName = () => {
    return (
        
            ComponentName Component
        
    );
};

export default ComponentName;
```

### JavaScript
```javascript
const fileName = {
    init: function() {
        // Initialize your code here
    },
};

export default fileName;
```

### HTML
```html



    
    
    fileName


    fileName


```

## License

MIT
