// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [parastyle, parasetStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [parastyle2, parasetStyle2] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//
//   const [textVisible, setTextVisible] = useState(false);
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       parasetStyle({ opacity: 1, transform: 'translateY(-240px)' });
//       parasetStyle2({ opacity: 1, transform: 'translateY(-220px)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//
//       const textTimer = setTimeout(() => {
//         setTextVisible((prevTextVisible) => !prevTextVisible);
//       }, 3000);
//
//       return () => clearTimeout(textTimer);
//     }, 300);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 5000); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, [currentImageIndex]);
//
//   // Function to toggle menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//
//   // Styles
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${textVisible ? '0%' : '-100%'})`,
//     zIndex: -1,
//     opacity: textVisible ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const paraStyle = {
//     ...parastyle,
//     position: 'absolute',
//     top: '50%',
//     left: '35%',
//     zIndex: 1,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const paraStyle2 = {
//     ...parastyle2,
//     position: 'absolute',
//     top: '50%',
//     left: '1.2%',
//     zIndex: 1,
//     color: '#B4B5B4',
//     fontSize: '0.4em',
//     transition: 'opacity 1s ease-in-out, transform 3s ease-in-out',
//     opacity: textVisible ? 1 : 1,
//   };
//
//   const menuButtonStyle = {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     cursor: 'pointer',
//     zIndex: 2,
//     backgroundColor: '#007bff', // A pleasing blue background
//     color: 'white', // White text color
//     padding: '10px 15px', // Padding around the text
//     borderRadius: '5px', // Rounded corners
//     fontSize: '16px', // Larger font size
//     fontWeight: 'bold', // Bold font
//     boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
//     transition: 'background-color 0.3s, transform 0.3s', // Smooth transition for hover effects
//
//     // Hover State
//     ':hover': {
//       backgroundColor: '#0056b3', // Darker shade of blue on hover
//       transform: 'scale(1.05)', // Slightly increase the size on hover
//     },
//
//     // Focus State (for accessibility)
//     ':focus': {
//       outline: 'none',
//       boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.5)',
//     },
//
//     // Adding a simple hamburger icon using CSS content
//     '::before': {
//       content: '"☰"', // Hamburger icon
//       display: 'block',
//     },
//   };
//
//   const fullPageMenuStyle = {
//     display: menuOpen ? 'flex' : 'none',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'flex-start', // Align items to the start (left) of the container
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.75)',
//     color: 'white',
//     zIndex: 2,
//     paddingTop: '30px', // Top padding of the full page menu
//     paddingLeft: '20px', // Left padding of the full page menu
//     paddingRight: '20px', // Right padding of the full page menu
//   };
//
//   const menuItemStyle = {
//     paddingTop: '5px', // Top padding inside each menu item
//     paddingBottom: '20px', // Bottom padding inside each menu item
//     paddingLeft: '20px', // Left padding to shift the text to the right
//     paddingRight: '20px', // Right padding (optional, can be adjusted)
//     fontSize: '24px',
//     textDecoration: 'none',
//     color: 'white',
//     width: '100%', // Ensures the menu item spans the full width of its container
//   };
//
//   const headingStyle = {
//     ...style,
//     position: 'absolute',
//     top: '45%',
//     left: '9%',
//     minWidth: '100%',
//     minHeight: '80%',
//     zIndex: 1,
//     fontStyle: 'sans-serif',
//     transition: 'opacity 1s ease-in-out, transform 3s ease-in-out',
//     fontSize: '9em',
//     opacity: isAnimationComplete ? 1 : 0, // Set opacity based on animation state
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <h1 style={headingStyle}>
//         <span style={{ color: '#51B1D4', opacity: textVisible ? 1 : 1 }}>S</span>
//         <img
//           src="/static/assets/images/loading.gif"
//           alt="Loading GIF"
//           style={{
//             width: '100px',
//             height: '100px',
//             display: 'inline-block',
//             margin: '15px 8px 0',
//             verticalAlign: 'top',
//           }}
//         />
//         <span style={{ color: '#51B1D4', opacity: textVisible ? 1 : 1 }}>F</span>
//         <span style={{ color: '#92999B', opacity: textVisible ? 1 : 1 }}>TRONIC</span>
//         <span style={{ color: '#51B1D4', opacity: textVisible ? 1 : 1 }}>LABS</span>
//         <p style={paraStyle2}>Digitizing Your Business Operations</p>
//       </h1>
//
//       {/* Menu Button */}
//       <div style={menuButtonStyle} onClick={toggleMenu}>
//         ☰ Menu
//       </div>
//
//       {/* Full Page Menu */}
//       <div style={fullPageMenuStyle}>
//         <a href="/datadissection/welcome/" style={menuItemStyle}>
//           Home
//         </a>
//         <a href="/datadissection/all_entities/" style={menuItemStyle}>
//           Folders
//         </a>
//         <a href="/chart/list/" style={menuItemStyle}>
//           Charts
//         </a>
//         <a href="/tablemodelview/list/" style={menuItemStyle}>
//           Datasets
//         </a>
//         <a href="/dashboard/list/" style={menuItemStyle}>
//           Dashboards
//         </a>
//         <a href="/datadissection/tags/" style={menuItemStyle}>
//           Create Folders
//         </a>
//       </div>
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [parastyle, parasetStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [parastyle2, parasetStyle2] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//
//   const [textVisible, setTextVisible] = useState(false);
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       parasetStyle({ opacity: 1, transform: 'translateY(-240px)' });
//       parasetStyle2({ opacity: 1, transform: 'translateY(-220px)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//
//       const textTimer = setTimeout(() => {
//         setTextVisible((prevTextVisible) => !prevTextVisible);
//       }, 3000);
//
//       return () => clearTimeout(textTimer);
//     }, 300);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 5000); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, [currentImageIndex]);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${textVisible ? '0%' : '-100%'})`,
//     zIndex: -1,
//     opacity: textVisible ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const paraStyle = {
//     ...parastyle,
//     position: 'absolute',
//     top: '50%',
//     left: '35%',
//     zIndex: 1,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const paraStyle2 = {
//     ...parastyle2,
//     position: 'absolute',
//     top: '50%',
//     left: '1.2%',
//     zIndex: 1,
//     color: '#B4B5B4',
//     fontSize: '0.4em',
//     transition: 'opacity 1s ease-in-out, transform 3s ease-in-out',
//     opacity: textVisible ? 1 : 1,
//   };
//
//   const headingStyle = {
//     ...style,
//     position: 'absolute',
//     top: '45%',
//     left: '9%',
//     minWidth: '100%',
//     minHeight: '80%',
//     zIndex: 1,
//     fontStyle: 'sans-serif',
//     transition: 'opacity 1s ease-in-out, transform 3s ease-in-out',
//     fontSize: '9em',
//     opacity: isAnimationComplete ? 1 : 0, // Set opacity based on animation state
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <h1 style={headingStyle}>
//         <span style={{ color: '#51B1D4', opacity: textVisible ? 1 : 1 }}>S</span>
//         <img
//           src="/static/assets/images/loading.gif"
//           alt="Loading GIF"
//           style={{
//             width: '100px',
//             height: '100px',
//             display: 'inline-block',
//             margin: '15px 8px 0',
//             verticalAlign: 'top',
//           }}
//         />
//         <span style={{ color: '#51B1D4', opacity: textVisible ? 1 : 1 }}>F</span>
//         <span style={{ color: '#92999B', opacity: textVisible ? 1 : 1 }}>TRONIC</span>
//         <span style={{ color: '#51B1D4', opacity: textVisible ? 1 : 1 }}>LABS</span>
//         <p style={paraStyle2}>Digitizing Your Business Operations</p>
//       </h1>
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [imageStyle, setImageStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [gifStyle, setGifStyle] = useState({
//     opacity: 0,
//     transform: 'translateX(0px)',
//   });
//
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//
//   const [textVisible, setTextVisible] = useState(false);
//
//   const logo = '/static/assets/images/logo.png'
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       setImageStyle({ opacity: 1, transform: 'translateY(-50%)' });
//       setGifStyle({ opacity: 1, transform: 'translateX(-50%)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//
//       const textTimer = setTimeout(() => {
//         setTextVisible((prevTextVisible) => !prevTextVisible);
//       }, 3000);
//
//       return () => clearTimeout(textTimer);
//     }, 300);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 5000); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, [currentImageIndex]);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${textVisible ? '0%' : '-100%'})`,
//     zIndex: -1,
//     opacity: textVisible ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     width: '100px',
//     height: '100px',
//     transform: `translate(-50%, -50%) translateY(${textVisible ? '-50%' : '0%'})`,
//     zIndex: 1,
//     opacity: textVisible ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <img
//         src={logo} // Use your logo image source here
//         alt="Logo"
//         style={logoStyle}
//       />
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [imageStyle, setImageStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [gifStyle, setGifStyle] = useState({
//     opacity: 0,
//     transform: 'translateX(0px)',
//   });
//
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//
//   const logo = '/static/assets/images/logo.png';
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       setImageStyle({ opacity: 1, transform: 'translateY(-50%)' });
//       setGifStyle({ opacity: 1, transform: 'translateX(-50%)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//     }, 300);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 5000); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isAnimationComplete ? '0%' : '-100%'
//     })`,
//     zIndex: -1,
//     opacity: isAnimationComplete ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     width: '100px',
//     height: '100px',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1,
//     opacity: 1, // Keep the logo always visible
//     // Add any additional styles you want for the logo
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <img
//         src={logo} // Use your logo image source here
//         alt="Logo"
//         style={logoStyle}
//       />
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [imageStyle, setImageStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [gifStyle, setGifStyle] = useState({
//     opacity: 0,
//     transform: 'translateX(0px)',
//   });
//
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//   const [isLogoVisible, setLogoVisible] = useState(false); // Added state for logo visibility
//
//   const logo = '/static/assets/images/logo.png';
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       setImageStyle({ opacity: 1, transform: 'translateY(-50%)' });
//       setGifStyle({ opacity: 1, transform: 'translateX(-50%)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//
//       // Set logo visibility to true after a delay
//       setTimeout(() => {
//         setLogoVisible(true);
//       }, 1000); // Adjust the delay as needed
//     }, 300);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 5000); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isAnimationComplete ? '0%' : '-100%'
//     })`,
//     zIndex: -1,
//     opacity: isAnimationComplete ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: isLogoVisible ? '15%' : '100%', // Initially position below viewport
//     left: '50%',
//     width: '1400px',
//     height: '200px',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1,
//     opacity: 1, // Keep the logo always visible
//     transition: 'top 1s ease-in-out', // Add a transition effect for top property
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <img
//         src={logo} // Use your logo image source here
//         alt="Logo"
//         style={logoStyle}
//       />
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [imageStyle, setImageStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [gifStyle, setGifStyle] = useState({
//     opacity: 0,
//     transform: 'translateX(0px)',
//   });
//
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//   const [isLogoVisible, setLogoVisible] = useState(false); // Added state for logo visibility
//
//   const logo = '/static/assets/images/logo.gif'; // Use the GIF image path
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       setImageStyle({ opacity: 1, transform: 'translateY(-50%)' });
//       setGifStyle({ opacity: 1, transform: 'translateX(-50%)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//
//       // Set logo visibility to true after a delay
//       setTimeout(() => {
//         setLogoVisible(true);
//       }, 1000); // Adjust the delay as needed
//     }, 300);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 5000); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isAnimationComplete ? '0%' : '-100%'
//     })`,
//     zIndex: -1,
//     opacity: isAnimationComplete ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: isLogoVisible ? '15%' : '100%', // Initially position below viewport
//     left: '50%',
//     width: '1400px', // Adjust the width and height according to your GIF dimensions
//     height: '160px',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1,
//     opacity: 1, // Keep the logo always visible
//     transition: 'top 1s ease-in-out', // Add a transition effect for the top property
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <img
//         src={logo} // Use your logo GIF image source here
//         alt="Logo"
//         style={logoStyle}
//       />
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [imageStyle, setImageStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [gifStyle, setGifStyle] = useState({
//     opacity: 0, // Initially set the opacity to 0
//     transform: 'translateX(0px)',
//   });
//
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//   const [isLogoVisible, setLogoVisible] = useState(false); // Added state for logo visibility
//
//   const logo = '/static/assets/images/logo.gif'; // Use the GIF image path
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       setImageStyle({ opacity: 1, transform: 'translateY(-50%)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//
//       // Set logo visibility to true after a delay
//       setTimeout(() => {
//         setLogoVisible(true);
//         // Set the opacity of the GIF to 1 when it should be visible
//         setGifStyle({ ...gifStyle, opacity: 1 });
//       }, 1000); // Adjust the delay as needed
//     }, 300);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 5000); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isAnimationComplete ? '0%' : '-100%'
//     })`,
//     zIndex: -1,
//     opacity: isAnimationComplete ? 1 : 0,
//     transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: isLogoVisible ? '15%' : '100%', // Initially position below viewport
//     left: '50%',
//     width: '1400px', // Adjust the width and height according to your GIF dimensions
//     height: '160px',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1,
//     opacity: 1, // Keep the logo always visible
//     transition: 'top 1s ease-in-out', // Add a transition effect for the top property
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <img
//         src={logo} // Use your logo GIF image source here
//         alt="Logo"
//         style={logoStyle}
//       />
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLogoVisible, setLogoVisible] = useState(false);
//   const [isLoading, setLoading] = useState(true); // Add loading state
//
//   const logo = '/static/assets/images/logo.gif'; // Use the GIF image path
//   const loadingGif = '/static/assets/images/loading.gif'; // Loading GIF path
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 3500); // Change image every 3.5 seconds
//
//     setTimeout(() => {
//       setLogoVisible(true);
//       // Mark loading as complete after 5 seconds
//       setTimeout(() => {
//         setLoading(false);
//       }, 6000);
//     }, 6000); // Show the logo after a delay
//
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isLoading ? '-100%' : '0%'
//     })`,
//     zIndex: -1,
//     opacity: isLoading ? 0 : 1,
//     transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: isLogoVisible ? '10%' : '60%', // Adjusted starting position here
//     left: '50%',
//     width: '1400px',
//     height: '160px',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1,
//     opacity: 1,
//     transition: 'top 1s ease-in-out',
//   };
//
//   return (
//     <div style={pageStyle}>
//       {isLoading && (
//         <img src={loadingGif} alt="Loading" style={{ ...imgStyle, opacity: 1 }} />
//       )}
//       {imagePaths.map((imagePath, index) => (
//         <img
//           key={index}
//           src={imagePath}
//           alt={`Background ${index}`}
//           style={{
//             ...imgStyle,
//             opacity: index === currentImageIndex && !isLoading ? 1 : 0,
//             transitionDelay: `${index * 3}s`, // Delay the transition for each image
//           }}
//         />
//       ))}
//       {isLogoVisible && !isLoading && (
//         <img src={logo} alt="Logo" style={logoStyle} />
//       )}
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;



// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLogoVisible, setLogoVisible] = useState(false);
//   const [isLoading, setLoading] = useState(true); // Add loading state
//
//   const logo = '/static/assets/images/logo.gif'; // Use the GIF image path
//   const loadingGif = '/static/assets/images/loading.gif'; // Loading GIF path
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 3500); // Change image every 3.5 seconds
//
//     setTimeout(() => {
//       setLogoVisible(true);
//       // Mark loading as complete after 5 seconds
//       setTimeout(() => {
//         setLoading(false);
//       }, 5000);
//     }, 1000); // Show the logo after a delay
//
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isLoading ? '-100%' : '0%'
//     })`,
//     zIndex: -1,
//     opacity: isLoading ? 0 : 1,
//     transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: isLoading ? '50%' : '10%', // Adjusted starting position here
//     left: '13%',
//     transform: `translate(-50%, ${isLoading ? '-50%' : '-50% - 50px'})`, // Move up after loading
//     width: '1400px',
//     height: '160px',
//     zIndex: 1,
//     opacity: 1,
//     transition: 'top 6s ease-in-out, transform 6s ease-in-out',
//   };
//
//   const loadingGifStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '17.2%',
//   transform: 'translate(-50%, -50%)',
//   width: '160px', // Adjust the width as needed
//   height: '160px', // Adjust the height as needed
//   opacity: isLoading ? 1 : 0,
//   transition: 'opacity 1s ease-in-out',
// };
//
//
//   return (
//     <div style={pageStyle}>
//       <img
//         src={loadingGif} // Loading GIF source
//         alt="Loading"
//         style={loadingGifStyle}
//       />
//       {imagePaths.map((imagePath, index) => (
//         <img
//           key={index}
//           src={imagePath}
//           alt={`Background ${index}`}
//           style={{
//             ...imgStyle,
//             opacity: index === currentImageIndex && !isLoading ? 1 : 0,
//             transitionDelay: `${index * 3}s`, // Delay the transition for each image
//           }}
//         />
//       ))}
//       {isLogoVisible && !isLoading && (
//         <img src={logo} alt="Logo" style={logoStyle} />
//       )}
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;



// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [style, setStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [imageStyle, setImageStyle] = useState({
//     opacity: 0,
//     transform: 'translateY(0px)',
//   });
//
//   const [gifStyle, setGifStyle] = useState({
//     opacity: 0, // Initially set the opacity to 0
//     transform: 'translateX(0px)',
//   });
//
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//   const [isLogoVisible, setLogoVisible] = useState(false); // Added state for logo visibility
//
//   const logo = '/static/assets/images/logo.gif'; // Use the GIF image path
//
//   const imagePaths = [
//     '/static/assets/images/screenshots/gallery.jpg',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStyle({ opacity: 1, transform: 'translateY(-280px)' });
//       setImageStyle({ opacity: 1, transform: 'translateY(-50%)' });
//
//       // Set animation complete state to true
//       setAnimationComplete(true);
//
//       // Set logo visibility to true after a delay
//       setTimeout(() => {
//         setLogoVisible(true);
//         // Set the opacity of the GIF to 1 when it should be visible
//         setGifStyle({ ...gifStyle, opacity: 1 });
//       }, 50); // Adjust the delay as needed
//     }, 1000);
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 3500); // Change image every 5 seconds
//
//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '100%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isAnimationComplete ? '0%' : '-100%'
//     })`,
//     zIndex: -1,
//     opacity: isAnimationComplete ? 0.1 : 0,
//     transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';,
//   };
//
//   const logoStyle = {
//       position: 'absolute',
//       top: isLogoVisible ? '10%' : '50%', // Start below the viewport
//       left: '50%',
//       width: '1400px',
//       height: '160px',
//       transform: 'translate(-50%, -50%)',
//       zIndex: 1,
//       opacity: isAnimationComplete && isLogoVisible ? 1 : 0, // Only make it visible after 3 seconds
//       transition: 'top 3s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1)', // Smooth transition with cubic-bezier timing function
//     };
//
//
//
//   return (
//     <div style={pageStyle}>
//       <img style={imgStyle} src={imagePaths[currentImageIndex]} alt="Background" />
//       <img
//         src={logo} // Use your logo GIF image source here
//         alt="Logo"
//         style={logoStyle}
//       />
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [isInitialLoad, setInitialLoad] = useState(true);
//   const [loadingGifStyle, setLoadingGifStyle] = useState({
//     opacity: 1, // Visible initially
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     transition: 'top 0.5s ease-in-out', // Smooth transition for moving up
//     zIndex: 3,
//   });
//
//   const [logoStyle, setLogoStyle] = useState({
//     opacity: 0, // Initially hidden
//     position: 'absolute',
//     bottom: '-100px', // Start below the view
//     left: '50%',
//     transform: 'translateX(-50%)',
//     transition: 'bottom 0.5s ease-in-out, opacity 0.5s ease', // Smooth transition for moving up and fading in
//     zIndex: 2,
//   });
//
//   const logo = '/static/assets/images/logo.gif'; // Path to logo GIF
//   const loadingGif = '/static/assets/images/loading.gif'; // Path to loading GIF
//
//   useEffect(() => {
//     setTimeout(() => {
//       // After 3 seconds, start the animation sequence
//       setInitialLoad(false); // Hide the grey screen
//       setLoadingGifStyle(prev => ({ ...prev, top: '45%' })); // Move loading gif up
//       setLogoStyle(prev => ({ ...prev, bottom: '10px', opacity: 1 })); // Raise and show logo
//     }, 3000);
//   }, []);
//
//   const initialLoadStyle = {
//     display: isInitialLoad ? 'flex' : 'none', // Hide after 3 seconds
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'darkgrey', // Dark grey background
//     height: '100vh',
//     width: '100vw',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     zIndex: 4,
//   };
//
//   return (
//     <div>
//       <div style={initialLoadStyle}>
//         <img src={loadingGif} alt="Loading" style={loadingGifStyle} />
//       </div>
//       <img src={logo} alt="Logo" style={logoStyle} />
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLogoVisible, setLogoVisible] = useState(false);
//   const [isLoading, setLoading] = useState(true); // Add loading state
//
//   const logo = '/static/assets/images/logo.gif'; // Use the GIF image path
//   const loadingGif = '/static/assets/images/loading.gif'; // Loading GIF path
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 3500); // Change image every 3.5 seconds
//
//     setTimeout(() => {
//       // Mark loading as complete after 5 seconds
//       setTimeout(() => {
//         setLoading(false);
//         setLogoVisible(true);
//       }, 3000);
//     }, 1000); // Show the logo after a delay
//
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//     backgroundColor: isLoading ? '#333' : 'transparent', // Dark grey background while loading
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${
//       isLoading ? '-100%' : '0%'
//     })`,
//     zIndex: -1,
//     opacity: isLoading ? 0 : 1,
//     transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
//   };
//
//     const logoStyle = {
//     position: 'absolute',
//     top: isLogoVisible ? '10%' : '60%', // Adjusted starting position here
//     left: '50%',
//     width: '1400px',
//     height: '160px',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1,
//     opacity: 1,
//     transition: 'top 5s ease-in-out',
//   };
//
//   const loadingGifStyle = {
//     position: 'absolute',
//     top: isLoading ? '50%' : '-10%', // Start from the middle and move up
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '160px', // Adjust the width as needed
//     height: '160px', // Adjust the height as needed
//     opacity: isLoading ? 1 : 0,
//     transition: 'top 2s ease-in-out, opacity 2s ease-in-out', // Transition top and opacity
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img
//         src={loadingGif} // Loading GIF source
//         alt="Loading"
//         style={loadingGifStyle}
//       />
//       {imagePaths.map((imagePath, index) => (
//         <img
//           key={index}
//           src={imagePath}
//           alt={`Background ${index}`}
//           style={{
//             ...imgStyle,
//             opacity: index === currentImageIndex && !isLoading ? 1 : 0,
//             transitionDelay: `${index * 3}s`, // Delay the transition for each image
//           }}
//         />
//       ))}
//       {isLogoVisible && !isLoading && (
//         <img src={logo} alt="Logo" style={logoStyle} />
//       )}
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLogoVisible, setLogoVisible] = useState(false);
//   const [isLoading, setLoading] = useState(true);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//   const logo = '/static/assets/images/logo.gif';
//   const loadingGif = '/static/assets/images/loading.gif';
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 3500);
//
//     // Hide the dark grey loading screen after 2 seconds
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//
//     // Delay showing the logo
//     setTimeout(() => {
//       setLogoVisible(true);
//     }, 3000);
//
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//     backgroundColor: isLoading ? '#333' : 'transparent',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${isLoading ? '-100%' : '0%'})`,
//     zIndex: -1,
//     opacity: isLoading ? 0 : 1,
//     transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
//   };
//
//   const loadingGifStyle = {
//     position: 'absolute',
//     top: '30%', // 40% from the top
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '160px',
//     height: '160px',
//     opacity: 1,
//     transition: 'opacity 2s ease-in-out',
//   };
//
// const logoStyle = {
//   position: 'absolute',
//   top: isLogoVisible ? '50%' : '100%', // Start below the viewport
//   left: '50%',
//   width: '1400px',
//   height: '160px',
//   transform: `translate(-50%, ${isLogoVisible ? '-50%' : '100%'})`, // Move vertically from 100% to -50% when visible
//   zIndex: 1,
//   opacity: isAnimationComplete && isLogoVisible ? 1 : 0, // Only make it visible after the animation is complete
//   transition: 'top 3s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)', // Smooth transition with cubic-bezier timing function
// };
//
//
//
//
//   return (
//     <div style={pageStyle}>
//       <img src={loadingGif} alt="Loading" style={loadingGifStyle} />
//       {imagePaths.map((imagePath, index) => (
//         <img
//           key={index}
//           src={imagePath}
//           alt={`Background ${index}`}
//           style={{
//             ...imgStyle,
//             opacity: index === currentImageIndex && !isLoading ? 1 : 0,
//             transitionDelay: `${index * 3}s`,
//           }}
//         />
//       ))}
//       {isLogoVisible && (
//         <img src={logo} alt="Logo" style={logoStyle} />
//       )}
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;



// import React, { useState, useEffect } from 'react';
//
// function GreyBackgroundPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLogoVisible, setLogoVisible] = useState(false);
//   const [isLoading, setLoading] = useState(true);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//   const logo = '/static/assets/images/logo.gif';
//   const loadingGif = '/static/assets/images/loading.gif';
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 3500);
//
//     // Hide the dark grey loading screen after 2 seconds
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//
//     // Delay showing the logo
//     setTimeout(() => {
//       setLogoVisible(true);
//     }, 3000);
//
//     // Set animation complete after 3 seconds
//     setTimeout(() => {
//       setAnimationComplete(true);
//     }, 3000);
//
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//     backgroundColor: isLoading ? '#333' : 'transparent',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${isLoading ? '-100%' : '0%'})`,
//     zIndex: -1,
//     opacity: isLoading ? 0 : 1,
//     transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
//   };
//
//   const loadingGifStyle = {
//     position: 'absolute',
//     top: '30%', // 30% from the top
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '160px',
//     height: '160px',
//     opacity: 1,
//     transition: 'opacity 2s ease-in-out',
//   };
//
//   const logoStyle = {
//     position: 'absolute',
//     top: isLogoVisible ? '50%' : '100%', // Start below the viewport
//     left: '50%',
//     width: '1400px',
//     height: '160px',
//     transform: `translate(-50%, ${isAnimationComplete ? '-50%' : '100%'})`, // Move vertically from 100% to -50% when visible
//     zIndex: 1,
//     opacity: isAnimationComplete && isLogoVisible ? 1 : 0, // Only make it visible after the animation is complete
//     transition: 'top 3s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)', // Smooth transition with cubic-bezier timing function
//   };
//
//   return (
//     <div style={pageStyle}>
//       <img src={loadingGif} alt="Loading" style={loadingGifStyle} />
//       {imagePaths.map((imagePath, index) => (
//         <img
//           key={index}
//           src={imagePath}
//           alt={`Background ${index}`}
//           style={{
//             ...imgStyle,
//             opacity: index === currentImageIndex && !isLoading ? 1 : 0,
//             transitionDelay: `${index * 3}s`,
//           }}
//         />
//       ))}
//       {isLogoVisible && (
//         <img src={logo} alt="Logo" style={logoStyle} />
//       )}
//     </div>
//   );
// }
//
// export default GreyBackgroundPage;


// import React, { useState, useEffect } from 'react';
// import './GreyBackgroundPage.css'; // Import the CSS file
//
// function GreyBackgroundPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLogoVisible, setLogoVisible] = useState(false);
//   const [isLoading, setLoading] = useState(true);
//   const [isAnimationComplete, setAnimationComplete] = useState(false);
//   const logo = '/static/assets/images/logo1.png';
//   const loadingGif = '/static/assets/images/loading.gif';
//
//   const imagePaths = [
//     '/static/assets/images/viz_thumbnails/deck_arc.png',
//     '/static/assets/images/img_gallery_left@mb.jpg',
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
//     }, 3500);
//
//     // Hide the dark grey loading screen after 2 seconds
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//
//     // Delay showing the logo
//     setTimeout(() => {
//       setLogoVisible(true);
//     }, 3000);
//
//     // Set animation complete after 3 seconds
//     setTimeout(() => {
//       setAnimationComplete(true);
//     }, 3000);
//
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//
//   const pageStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '93vh',
//     position: 'relative',
//     overflow: 'hidden',
//     backgroundColor: isLoading ? '#333' : 'transparent',
//   };
//
//   const imgStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     minWidth: '88%',
//     minHeight: '90%',
//     width: 'auto',
//     height: '100%',
//     transform: `translate(-50%, -50%) translateX(${isLoading ? '-100%' : '0%'})`,
//     zIndex: -1,
//     opacity: isLoading ? 0 : 1,
//     transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
//   };
//
//   const loadingGifStyle = {
//     position: 'absolute',
//     top: '25%', // 30% from the top
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '160px',
//     height: '160px',
//     opacity: 1,
//     transition: 'opacity 2s ease-in-out',
//   };
//
// const logoStyle = {
//   position: 'absolute',
//   bottom: '40%', // Set the initial bottom position (can be any value)
//   left: '50%',
//   width: '1400px',
//   height: '160px',
//   transform: 'translate(-50%, -30%)',
//   zIndex: 1,
//   opacity: isAnimationComplete && isLogoVisible ? 1 : 0,
//   animation: isLogoVisible ? 'slideInFromBottom 3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
// };
//
// return (
//   <div style={pageStyle}>
//     <img src={loadingGif} alt="Loading" style={loadingGifStyle} />
//     {imagePaths.map((imagePath, index) => (
//       <img
//         key={index}
//         src={imagePath}
//         alt={`Background ${index}`}
//         style={{
//           ...imgStyle,
//           opacity: index === currentImageIndex && !isLoading ? 1 : 0,
//           transitionDelay: `${index * 3}s`, // Delay each image by 3 seconds
//         }}
//       />
//     ))}
//     {isLogoVisible && (
//       <img src={logo} alt="Logo" style={logoStyle} />
//     )}
//   </div>
// );
//
// }
//
// export default GreyBackgroundPage;




// import React, { useEffect, useState } from 'react';
//
// const BlackBackgroundPage: React.FC = () => {
//   const [opacity, setOpacity] = useState(0); // Initial opacity is 0
//   const loadingGif = '/static/assets/images/animation.gif'
//
//   useEffect(() => {
//     setOpacity(1); // Change opacity to 1 after the component mounts
//   }, []);
//
//   const containerStyle = {
//     backgroundColor: 'black',
//     color: 'white',
//     minHeight: '100vh',
//     // No padding here, so the container div will not have its own padding
//   };
//
//   const headingStyle = {
//       position: 'relative', // Set position to relative
//       left: '35px', // Shift the element to the right
//       top: '170px',
//       opacity: opacity, // Use the opacity state
//       transition: 'opacity 2s ease' // Transition effect for the opacity
//       fontStyle: 'normal',             // Example: 'normal', 'italic', 'oblique'
//       fontWeight: '600',              // Example: 'normal', 'bold', '100', '600', etc.
//       fontFamily: 'Roboto, sans-serif', // Specify the font family
//       fontSize: '40px',                // Example font size
//       color: 'white',                  // Font color
//   };
//
//   const loadingGifStyle = {
//     position: 'absolute',
//     top: '18%', // 30% from the top
//     left: '40%',
//     width: '1120px',
//     height: '650px',
//     opacity: opacity,
//     transition: 'opacity 4s ease'
//   };
//
//
//   return (
//     <div style={containerStyle}>
//       <h1 style={headingStyle}>Data Dissection Platform</h1>
//       <img src={loadingGif} alt="Loading" style={loadingGifStyle}/>
//     </div>
//   );
// };
//
// export default BlackBackgroundPage;



// import React, { useEffect, useState } from 'react';
//
// const BlackBackgroundPage: React.FC = () => {
//   const [dataOpacity, setDataOpacity] = useState(0);
//   const [dissectionOpacity, setDissectionOpacity] = useState(0);
//   const [platformOpacity, setPlatformOpacity] = useState(0);
//   const loadingGif = '/static/assets/images/animation.gif';
//
//   useEffect(() => {
//     setDataOpacity(1); // "Data" appears immediately
//     const timer1 = setTimeout(() => setDissectionOpacity(1), 2500); // "Dissection" appears after 2 seconds
//     const timer2 = setTimeout(() => setPlatformOpacity(1), 3000); // "Platform" appears after 4 seconds
//
//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };
//   }, []);
//
//   const containerStyle = {
//     backgroundColor: 'black',
//     color: 'white',
//     minHeight: '100vh',
//   };
//
//   const wordStyle = {
//     position: 'relative',
//     fontStyle: 'normal',
//     fontWeight: '600',
//     fontFamily: 'Roboto, sans-serif',
//     fontSize: '40px',
//     color: 'white',
//     transition: 'opacity 1.5s ease'
//   };
//
//   const loadingGifStyle = {
//     position: 'absolute',
//     top: '18%',
//     left: '40%',
//     width: '1120px',
//     height: '650px',
//     opacity: dataOpacity, // Use the first word's opacity for consistency
//     transition: 'opacity 4s ease'
//   };
//
//   return (
//     <div style={containerStyle}>
//       <h1 style={{...wordStyle, left: '35px', top: '180px' , opacity: dataOpacity}}>DATA</h1>
//       <h1 style={{...wordStyle, left: '165px', top: '121px', opacity: dissectionOpacity}}>DISSECTION</h1>
//       <h1 style={{...wordStyle, left: '35px', top: '120px', opacity: platformOpacity}}>PLATFORM</h1>
//       <img src={loadingGif} alt="Loading" style={loadingGifStyle}/>
//     </div>
//   );
// };
//
// export default BlackBackgroundPage;


// import React, { useEffect, useState } from 'react';
//
// const BlackBackgroundPage: React.FC = () => {
//   const [dataOpacity, setDataOpacity] = useState(0);
//   const [dissectionOpacity, setDissectionOpacity] = useState(0);
//   const [platformOpacity, setPlatformOpacity] = useState(0);
//   const [lineOpacity, setLineOpacity] = useState(0); // New state for line opacity
//   const [subTitleOpacity, setsubTitleOpacity] = useState(0);
//   const [gifOpacity, setgifOpacity] = useState(0);
//   const [subTextOpacity, setsubTextOpacity] = useState(0);
//   const [subTextOpacity1, setsubTextOpacity1] = useState(0);
//   const [subTextOpacity2, setsubTextOpacity2] = useState(0);
//   const [subTextOpacity3, setsubTextOpacity3] = useState(0);
//   const loadingGif = '/static/assets/images/animation.gif';
//
//   useEffect(() => {
//     setDataOpacity(1); // "Data" appears immediately
//     const timer1 = setTimeout(() => setDissectionOpacity(1), 1500); // "Dissection" appears after 2.5 seconds
//     const timer2 = setTimeout(() => setPlatformOpacity(1), 2000); // "Platform" appears after 3 seconds
//     const timer3 = setTimeout(() => setLineOpacity(1), 2500); // Line appears after 3.5 seconds
//     const timer4 = setTimeout(() => setsubTitleOpacity(1), 3000);
//     const timer5 = setTimeout(() => setgifOpacity(1), 4000);
//     const timer6 = setTimeout(() => setsubTextOpacity(1), 4500);
//     const timer7 = setTimeout(() => setsubTextOpacity1(1), 9000);
//     const timer8 = setTimeout(() => setsubTextOpacity2(1), 14500);
//     const timer9 = setTimeout(() => setsubTextOpacity3(1), 14500);
//
//
//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//       clearTimeout(timer4);
//       clearTimeout(timer5);
//       clearTimeout(timer6);
//       clearTimeout(timer7);
//       clearTimeout(timer8);
//       clearTimeout(timer9);
//
//     };
//   }, []);
//
//   const containerStyle = {
//   backgroundColor: 'black',
//   color: 'white',
//   minHeight: '100vh',
//   overflowX: 'hidden',
// };
//
// const wordStyle = {
//   position: 'relative',
//   fontStyle: 'normal',
//   fontWeight: '600',
//   fontFamily: 'Roboto, sans-serif',
//   fontSize: '2vw', // Responsive font size
//   color: 'white',
//   transition: 'opacity 2s ease',
//   zIndex: 2,
//
// };
//
// const subTitleStyle = {
//   position: 'relative',
//   fontStyle: 'normal',
//   fontWeight: '400',
//   fontFamily: 'Roboto, sans-serif',
//   fontSize: '1.5vw', // Responsive font size
//   color: 'white',
//   opacity: subTitleOpacity,
//   transition: 'opacity 2.5s ease',
//   zIndex: 2,
//   left: '8vw', // Adjusted to use viewport width
// };
//
// const lineStyle = {
//   position: 'absolute',
//   width: '33vw',
//   borderTop: '3px solid white',
//   top: '25vh', // Adjusted to viewport height
//   left: '8vw', // Adjusted to use viewport width
//   opacity: lineOpacity,
//   transition: 'opacity 2s ease',
//   zIndex: 2,
// };
//
// const loadingGifStyle = {
//   position: 'absolute',
//   top: '18%',
//   left: '50vw', // Centered using viewport width
//   width: '45vw', // Responsive width
//   height: '75vh', // Responsive height
//   opacity: gifOpacity,
//   transition: 'opacity 3s ease',
// };
//
//
//     const subTextStyle = {
//     position: 'relative',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontFamily: 'Roboto, sans-serif',
//     fontSize: '15px',
//     color: 'grey',
//     opacity: setsubTextOpacity,
//     transition: 'opacity 2.5s ease',
//     zIndex: 2,
//     left: '8vw',
//   };
//
//   const subTextStyle1 = {
//     position: 'relative',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontFamily: 'Roboto, sans-serif',
//     fontSize: '15px',
//     color: 'white',
//     opacity: subTextOpacity1,
//     transition: 'opacity 2.5s ease',
//     zIndex: 2,
//     left: '8vw',
//   };
//
//   const subTextStyle2 = {
//     position: 'relative',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontFamily: 'Roboto, sans-serif',
//     fontSize: '15px',
//     color: 'white',
//     opacity: subTextOpacity2,
//     transition: 'opacity 2.5s ease',
//     zIndex: 2,
//     left: '8vw',
//   };
//
//   const subTextStyle3 = {
//     position: 'relative',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontFamily: 'Roboto, sans-serif',
//     fontSize: '15px',
//     color: 'white',
//     opacity: subTextOpacity3,
//     transition: 'opacity 2.5s ease',
//     zIndex: 2,
//     left: '8vw',
//   };
//
//   return (
//     <div style={containerStyle}>
//       <h1 style={{...wordStyle, left: '150px', top: '180px', opacity: dataOpacity}}>DATA</h1>
//       <h1 style={{...wordStyle, left: '270px', top: '123px', opacity: dissectionOpacity}}>DISSECTION</h1>
//       <h1 style={{...wordStyle, left: '530px', top: '66px', opacity: platformOpacity}}>PLATFORM</h1>
//       <h2 style={{...subTitleStyle, left: '150px', top: '80px', opacity: subTitleOpacity}}>Enriches data analytics with power of AI</h2>
//       <p style={{...subTextStyle, left: '150px', top: '150px', opacity: subTextOpacity}}>Our ETL layer adeptly orchestrates dynamic and static data.</p>
//       <p style={{...subTextStyle1, left: '150px', top: '151px', opacity: subTextOpacity1}}>While the AI layer will transforms this into profound insights.</p>
//       <p style={{...subTextStyle2, left: '150px', top: '152px', opacity: subTextOpacity2}}>Finally, the Visualization layer brings these insights to life with striking visuals,</p>
//       <p style={{...subTextStyle3, left: '150px', top: '153px', opacity: subTextOpacity3}}>together creating a seamless fusion of data intelligence for smarter decision-making </p>
//       <img src={loadingGif} alt="Loading" style={loadingGifStyle}/>
//     </div>
//   );
// };
//
// export default BlackBackgroundPage;



import React, { useEffect, useState } from 'react';

const Welcome: React.FC = () => {
  const [dataOpacity, setDataOpacity] = useState<number>(0);
  const [subTitleOpacity, setSubTitleOpacity] = useState<number>(0);
  const [gifOpacity, setGifOpacity] = useState<number>(0);
  const [subTextOpacity, setSubTextOpacity] = useState<number>(0);
  const [subTextOpacity1, setSubTextOpacity1] = useState<number>(0);
  const [subTextOpacity2, setSubTextOpacity2] = useState<number>(0);
  const loadingGif = '/static/assets/images/animation.gif';

  useEffect(() => {
    setDataOpacity(1); // "Data" appears immediately
    const timer1 = setTimeout(() => setSubTitleOpacity(1), 1500);
    const timer2 = setTimeout(() => setGifOpacity(1), 2500);
    const timer3 = setTimeout(() => setSubTextOpacity(1), 3500);
    const timer4 = setTimeout(() => setSubTextOpacity1(1), 8500);
    const timer5 = setTimeout(() => setSubTextOpacity2(1), 14000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);

    };
  }, []);

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
    minHeight: '94.4vh',
    overflowX: 'hidden',
    overflowY: 'hidden',
  };

  const wordStyle: React.CSSProperties = {
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 600,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '43px',
    color: 'white',
    transition: 'opacity 2s ease',
    zIndex: 2,
    overflowY: 'hidden',
  };
  
  const subTitleStyle: React.CSSProperties = {
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 400,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '30px',
    color: 'grey',
    opacity: subTitleOpacity,
    transition: 'opacity 2.5s ease',
    zIndex: 2,
  };

  const loadingGifStyle: React.CSSProperties = {
      position: 'absolute',
      top: '11%',
      left: '50%',
      width: '800px',
      height: '650px',
      opacity: gifOpacity, // Corrected to use gifOpacity
      transition: 'opacity 2s ease',
      overflowY: 'hidden',
    };


    const subTextStyle: React.CSSProperties = {
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 400,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    color: 'white',
    opacity: subTextOpacity,
    transition: 'opacity 2s ease',
    zIndex: 2,
  };

  const subTextStyle1: React.CSSProperties = {
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 400,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    color: 'white',
    opacity: subTextOpacity1,
    transition: 'opacity 2s ease',
    zIndex: 2,
  };

  const subTextStyle2: React.CSSProperties = {
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 400,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    color: 'white',
    opacity: subTextOpacity2,
    transition: 'opacity 2s ease',
    zIndex: 2,
  };


  return (
    <div style={containerStyle}>
      <h1 style={{ ...wordStyle, left: '8%', top: '210px', opacity: dataOpacity }}>DATA DISSECTION PLATFORM</h1>
      <h2 style={{ ...subTitleStyle, left: '8%', top: '220px', opacity: subTitleOpacity }}>Enhancing Data Analytics With AI Technology</h2>
      {/* @ts-ignore */}
      <p style={{...subTextStyle, left: '8%', top: '260px', opacity: subTextOpacity}}>Our ETL layer adeptly manages both dynamic and static data for efficient integration.</p>
      {/* @ts-ignore */}
      <p style={{...subTextStyle1, left: '8%', top: '261px', opacity: subTextOpacity1}}>While AI layer will effectively transform data, it yields profound and valuable insights.</p>
      {/* @ts-ignore */}
      <p style={{...subTextStyle2, left: '8%', top: '262px', opacity: subTextOpacity2}}>Finally, Visualization layer brings these insights with striking visuals together creating</p>
      {/* @ts-ignore */}
      <p style={{...subTextStyle2, left: '8%', top: '263px', opacity: subTextOpacity2}}>the seamless fusion of the data intelligence for smarter decision-making.</p>
      <img src={loadingGif} alt="Loading" style={loadingGifStyle} />
    </div>
  );
};

export default Welcome;

