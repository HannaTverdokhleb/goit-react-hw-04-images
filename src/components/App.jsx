import { useState, useEffect, useCallback } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import {getImages, PER_PAGE} from 'api/images';


const App = () => {

  const [category, setCategory] = useState('');
  const [page, setPage] = useState('1');
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);

  const handleSearch = (category) => {
    setCategory(category);
    setPage(1);
    setImageList([]);
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  }

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    try {
      let imageArray = await getImages(category, page);
      setImageList(prevState => ([...prevState, ...imageArray]));
      setHideLoadMoreButton(imageArray.length < PER_PAGE);
    } catch(err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [category, page]);
  
  useEffect(() => {
    loadImages();
  }, [loadImages]);

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
        {error ?
        <div className="error">Oh no! We have the following error: <strong>{error}</strong></div>
        :
        <>
          {imageList.length > 0 &&
            <>
              <ImageGallery imageList={imageList} />
              {(!isLoading && !hideLoadMoreButton) && <Button clickTOLoad={handleLoadMore} />}
            </>
          }
          {(imageList.length < 1 && category && !isLoading) && <div className="nothing">Nothing found :(</div> }
          {(isLoading && category) && <Loader />}
        </>
      }
    </>
  )
}


// class App extends Component {
//   state = {
//     category: "",
//     page: 1,
//     imageList: [],
//     isLoading: false,
//     error: '',
//     hideLoadMoreButton: false,
//   }

//   handleSearch = (category) => {
//     this.setState({ category, page: 1, imageList: [] });
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }))
//   }

//   async loadImages() {
//     const { category, page, imageList } = this.state;
//     this.setState({isLoading: true});
//     try {
//       let imageArray = await getImages(category, page);
//       this.setState({
//         imageList: [...imageList, ...imageArray],
//         hideLoadMoreButton: imageArray.length < PER_PAGE,
//       });
//     } catch(err) {
//       this.setState({ error: err.message });
//     }
//     this.setState({ isLoading: false });
//   }

//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.category !== this.state.category || prevState.page !== this.state.page) {
//       this.loadImages()
//     }
//   }

//   render() {
//     const { imageList, isLoading, category, error, hideLoadMoreButton } = this.state;
//     return (
//       <>
//         <Searchbar handleSearch={this.handleSearch} />
//         {error ?
//           <div className="error">Oh no! We have the following error: <strong>{error}</strong></div>
//           :
//           <>
//             {imageList.length > 0 && 
//               <>
//                 <ImageGallery imageList={imageList} />
//                 {(!isLoading && !hideLoadMoreButton) && <Button clickTOLoad={this.handleLoadMore} />}
//               </>
//             }
//             {(imageList.length < 1 && category && !isLoading) && <div className="nothing">Nothing found :(</div> }
//             {isLoading && <Loader />}
//           </>
//         }
//       </>
//     );
//   }
// };

export default App;
