import axios from "axios"
export default async function pixabayAPI(second)
{ 
    try {
       const response = await axios(
         'https://pixabay.com/api/?q=cat&page=1&key=37410571-78e708f3fcce6ce73b7e36a87&image_type=photo&orientation=horizontal&per_page=12'
        );
         console.log(response.data);
        
        return response.data
       
    } catch (error) {
        console.log(error)
    }

 }