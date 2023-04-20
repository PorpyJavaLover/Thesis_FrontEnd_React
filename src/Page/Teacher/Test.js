
import React from 'react'; 

const WeekTable = () => { 
   return ( 
      <table> 
         <head> head
            <tr> 
               <th>Day</th> 
               <th>Morning</th> 
               <th>Afternoon</th> 
               <th>Evening</th> 
            </tr> 
         </head> 
         <tbody> 
            <tr> 
               <td>Monday</td> 
               <td>Gym</td> 
               <td>Work</td> 
               <td>Reading</td> 
            </tr> 
            <tr> 
               <td>Tuesday</td> 
               <td>Yoga</td> 
               <td>Work</td> 
               <td>Cooking</td> 
            </tr> 
            <tr> 
               <td>Wednesday</td> 
               <td>Swimming</td> 
               <td>Work</td> 
               <td>Coding</td> 
            </tr> 
            <tr> 
               <td>Thursday</td> 
               <td>Running</td> 
               <td>Work</td> 
               <td>Movies</td> 
            </tr> 
            <tr> 
               <td>Friday</td> 
               <td>Gym</td> 
               <td>Work</td> 
               <td>Gaming</td> 
            </tr> 
            <tr> 
               <td>Saturday</td> 
               <td>Rest</td> 
               <td>Rest</td> 
               <td>Rest</td> 
            </tr> 
            <tr> 
               <td>Sunday</td> 
               <td>Rest</td> 
               <td>Rest</td> 
               <td>Rest</td> 
            </tr> 
         </tbody> 
      </table> 
   ); 
} 

export default WeekTable;