import {useEffect,useState} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';



const AvailableMeals = () => {
  const [meals,setmeals]=useState([]);
  const [IsLoading,setIsLoading]=useState(true);
  const [httpError,sethttpError]=useState();
  useEffect(()=>{
    const fetchMeals=async()=>{
    const response=await fetch('https://http-firebase-15e34-default-rtdb.firebaseio.com/meals.json');

    if(!response.ok)
    {
      throw new Error('Something went wrong!');
    }
    const responseData=await response.json()

    const loadedMeals=[];
    for(const key in responseData){
      loadedMeals.push({
        id:key,
        name:responseData[key].name,
        discription:responseData[key].discription,
        price:responseData[key].price
      })
    }
    setmeals(loadedMeals)
    setIsLoading(false)
    };
    
    fetchMeals().catch((error)=>{
      setIsLoading(false);
      sethttpError(error.message);
    });
  },[]);
      
  if(IsLoading){
    return (
    <section className={classes.MealLoading}>
      <p>Loading...</p>
    </section>
    )
  }
  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
