import React from "react";
import { useDispatch } from "react-redux";

export const issueStatus = {
  backlog: "backlog",
  selected: "selected",
  inprogress: "inprogress",
  done: "done",
};

// used in draggable
export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  itemId
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const itemToBeRemovedIndex = sourceClone.findIndex((el) => el.id === itemId);
  console.log("itemToBeRemoved#", itemToBeRemovedIndex);
  console.log("droppableSource#", droppableSource);
  const [removed] = sourceClone.splice(itemToBeRemovedIndex, 1);
  console.log(
    "id#",
    droppableDestination.droppableId,
    Object.keys(issueStatus),
    sourceClone,
    destClone,
    itemId
  );

  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

//reorder a draggable list
export const reorder = (list, startIndex, endIndex) => {
  console.log(list, startIndex, endIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const convertToArrayOfObjects = (data) => {
  let backlog = [],
    selected = [],
    inProgress = [],
    completed = [];
  const output = data.map((el) => {
    if (el.status == issueStatus.backlog) {
      backlog.push(el);
    } else if (el.status == issueStatus.selected) {
      selected.push(el);
    } else if (el.status == issueStatus.inprogress) {
      inProgress.push(el);
    } else {
      completed.push(el);
    }
    return [backlog, selected, inProgress, completed];
  });

  return output[0];
};

export const useOutsideAlerter = (ref, setActive) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // console.log(event);
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setActive(false));
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
