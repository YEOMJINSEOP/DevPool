import { useEffect, useState } from 'react';
import { faHtml5, faJsSquare, faJava, faCss3Alt, faVuejs, faReact, faAngular, faNode, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faMicrochip, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UserForm/UserForm.module.css'



export default function StackField({ selectedStack }) {
    
  const stackOptions = [
    { id: '1', label: 'HTML', icon: <FontAwesomeIcon className={styles.icon} icon={faHtml5} size="xl" style={{color: "#f77408",}} /> },
    { id: '2', label: 'CSS', icon: <FontAwesomeIcon className={styles.icon} icon={faCss3Alt} size="xl" style={{color: "#104094",}} /> },
    { id: '3', label: 'JavaScript', icon: <FontAwesomeIcon className={styles.icon} icon={faJsSquare} size="xl" style={{color: "#ebee20",}} /> },
    { id: '4', label: 'Vue.js', icon: <FontAwesomeIcon className={styles.icon} icon={faVuejs} size="xl" style={{color: "#4d8217",}} /> },
    { id: '5', label: 'React.js', icon: <FontAwesomeIcon className={styles.icon} icon={faReact} size="xl" style={{color: "#3a8fcf",}} /> },
    { id: '6', label: 'Angular', icon: <FontAwesomeIcon className={styles.icon} icon={faAngular} size="xl" style={{color: "#b91d1b",}} /> },
    { id: '7', label: 'Node.js', icon: <FontAwesomeIcon className={styles.icon} icon={faNode} size="xl" style={{color: "#5fb922",}} /> },
    { id: '8', label: 'Java(Spring)', icon: <FontAwesomeIcon className={styles.icon} icon={faJava} size="xl" style={{color: "#20426f",}} /> },
    { id: '9', label: 'Deep learning(AI)', icon: <FontAwesomeIcon className={styles.icon} icon={faMicrochip} size="xl" style={{color: "#235ab8",}} /> },
    { id: '10', label: 'Computer Vision(AI)', icon: <FontAwesomeIcon className={styles.icon} icon={faArrowsToEye} size="xl" style={{color: "#298b9e",}} /> },
    { id: '11', label: 'IOS', icon: <FontAwesomeIcon className={styles.icon} icon={faApple} size="xl" style={{color: "#0d0d0d",}} /> },
    { id: '12', label: 'Android', icon: <FontAwesomeIcon className={styles.icon} icon={faAndroid} size="xl" style={{color: "#5fb922",}} /> },
  ];

  const [selectedStackIcons, setSelectedStackIcons] = useState([]);

    useEffect(() => {
        if(selectedStack != null) {
            setSelectedStackIcons(stackOptions.filter(option => selectedStack.includes(option.label)));
        }
    }, [selectedStack])
  
    return (
    <div className={styles.user_stack}>
        {selectedStackIcons && selectedStackIcons.map((items) => {
          return (
            <div>{items.icon}</div>
          )
        })}
    </div>
  )
}
