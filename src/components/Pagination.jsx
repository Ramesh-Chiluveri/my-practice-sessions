import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import ListItem from './ListItem';
const Pagination = () => {
 const [currentPage, setCurrentPage] = React.useState(1);
 const [disabledPrev, setDisabledPrev] = React.useState(true);
 const [disabledNext, setDisabledNext] = React.useState(false);
 const fetchURL = "https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json";

 const { data, loading, error } = useFetch(fetchURL);

 const maxPages = React.useMemo(() => (data ? Math.ceil(data.length / 10) : 0), [data]);

 const pageData = (pageNumber) => {
    const startIndex = (pageNumber - 1) * 10;
    const endIndex = startIndex + 10;
    return data?.slice(startIndex, endIndex);
 }

//  const handlePaginationToggleButtons = useCallback((currentPage) => {

//     setDisabledPrev(currentPage === 1);
//     setDisabledNext(currentPage === maxPages);
//  }, [maxPages]);

 

//  useEffect(() => {
//     handlePaginationToggleButtons(currentPage);
// }, [handlePaginationToggleButtons, currentPage]);
    useEffect(() => {
        setDisabledPrev(currentPage === 1);
        setDisabledNext(currentPage === maxPages);
    }, [currentPage, maxPages]);
    return (
    <div>
       {loading && <p>Loading...</p>}
       {error && <p>Error: {error}</p>}
       {
        data && !loading && <>
            <ul>
                {pageData(currentPage).map((item) => (
                    <ListItem key={`${item?.id}`} item={item} />
                ))}
            </ul>   
        </>
       }
       {data && !loading && <><button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={disabledPrev}>Previous</button>
        <span>{currentPage} of {maxPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, maxPages))} disabled={disabledNext}>Next</button></>}
    </div>
  )
}

export default Pagination
