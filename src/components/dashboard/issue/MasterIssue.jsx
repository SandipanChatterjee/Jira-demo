import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  backlog,
  completed,
  getCurrentIssue,
  inprogress,
  selected,
  currentIssueFunction,
} from "../../../actions/issues";
import { updateIssueList } from "../../../services/updateIssueList";
import { Card, Grid, Paper, Modal } from "@material-ui/core";
import {
  issueStatus,
  move,
  reorder,
  convertToArrayOfObjects,
} from "../../../utils/utils";
import { useStyles } from "./style";
import { searchedDataHandler } from "../../../actions/search";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import { useDispatch, useSelector } from "react-redux";
import IssueModalContent from "../issueModal/IssueModalContent";

const MasterIssue = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelectorIssues();
  const searchedData =
    useSelector((state) => state.searchReducer.searchedData) || issueTypes;
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const currentIssue = useSelector((state) => state.issueReducer.currentIssue);
  const newCommentData = useSelector(
    (state) => state.commentsReducer.newCommentData
  );
  const editCommentData = useSelector(
    (state) => state.commentsReducer.editCommentData
  );
  const deleteCommentData = useSelector(
    (state) => state.commentsReducer.deleteCommentData
  );

  const [modalActive, setModalActive] = useState(false);

  const issueTypes = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ];

  const list = [];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("onDragEnd##", result, source, destination);
    if (!destination) {
      return;
    }
    const itemId = parseInt(result.draggableId);
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      console.log(issueTypes[sInd], sInd);
      const items = reorder(issueTypes[sInd], source.index, destination.index);
      const dispatchArr = [
        () => dispatch(backlog(items)),
        () => dispatch(selected(items)),
        () => dispatch(inprogress(items)),
        () => dispatch(completed(items)),
      ];
      dispatchArr[sInd]();
    } else {
      const result = move(
        issueTypes[sInd],
        issueTypes[dInd],
        source,
        destination,
        itemId
      );
      console.log("dInd#", result[dInd]);

      const dispatchArrForStartIndex = [
        () => dispatch(backlog(result[sInd])),
        () => dispatch(selected(result[sInd])),
        () => dispatch(inprogress(result[sInd])),
        () => dispatch(completed(result[sInd])),
      ];
      const dispatchArrForEndIndex = [
        () => dispatch(backlog(result[dInd])),
        () => dispatch(selected(result[dInd])),
        () => dispatch(inprogress(result[dInd])),
        () => dispatch(completed(result[dInd])),
      ];
      dispatchArrForStartIndex[sInd]();
      dispatchArrForEndIndex[dInd]();

      if (searchedData.length > 0) {
        console.log("searchedData##", searchedData, list);
        const arr = [
          selector.backlogIssues,
          selector.selectedIssues,
          selector.inprogressIssues,
          selector.completedIssues,
        ].flat(Infinity);

        let issues = arr.filter((el) => {
          return result[dInd].find((innerEl) => {
            return innerEl.id === el.id;
          });
        });
        issues.forEach((el) => {
          el.status =
            Object.keys(issueStatus)[parseInt(destination.droppableId)];
        });
        issues = issues.filter((el) => el.id === itemId);
        issues = [
          ...issues,
          ...searchedData.flat(Infinity).filter((el) => el.id !== itemId),
        ];
        let searchedDataArr = convertToArrayOfObjects(issues);
        console.log("searchedData##", searchedDataArr);
        dispatch(searchedDataHandler(searchedDataArr));
      }
    }

    const payload = {
      listPosition: destination.index,
      status: Object.keys(issueStatus)[parseInt(destination.droppableId)],
    };
    console.log(payload);
    updateIssueList(payload, parseInt(result.draggableId));
  };

  const modalOpenHanlder = (issueId) => {
    console.log(issueId);
    console.log("139");
    dispatch(getCurrentIssue(issueId));
    setModalActive(true);
  };

  const modalCloseHandler = () => {
    dispatch(currentIssueFunction({}));
    setModalActive(false);
  };

  useEffect(() => {
    if (
      Object.keys(newCommentData).length > 0 ||
      Object.keys(editCommentData).length > 0 ||
      Object.keys(deleteCommentData).length > 0
    ) {
      if (Object.keys(currentIssue).length > 0) {
        console.log("currentIssue", currentIssue);
        dispatch(getCurrentIssue(currentIssue.id));
      }
    }
  }, [newCommentData, editCommentData, deleteCommentData]);

  searchedData.length > 0
    ? searchedData.length > 0
      ? list.push(...searchedData)
      : list.push(...issueTypes)
    : list.push(...issueTypes);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container className="root" spacing={2}>
          <Grid item xs={12}>
            <Grid className={classes.girdDisplay}>
              {list.length > 0
                ? list.map((issueType, index) => {
                    // console.log("issueType#", issueType);
                    return (
                      <Droppable droppableId={`${index}`} key={index}>
                        {(provided, snapshot) => {
                          return (
                            <Grid
                              container
                              key={0}
                              alignItems="stretch"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              <Paper className={classes.paper}>
                                <span>
                                  {Object.keys(issueStatus)[
                                    index
                                  ].toUpperCase()}
                                </span>
                                {issueType.map((issue, index) => {
                                  // console.log("issue#", issue);
                                  const id = issue.id.toString();
                                  return (
                                    <Draggable
                                      key={id}
                                      draggableId={id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <Card
                                            className={classes.cardDisplay}
                                            ref={provided.innerRef}
                                            onClick={() =>
                                              modalOpenHanlder(issue.id)
                                            }
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <p>{issue.title}</p>
                                          </Card>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                              </Paper>
                              {provided.placeholder}
                            </Grid>
                          );
                        }}
                      </Droppable>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
      {
        <Modal
          open={modalActive}
          onClose={modalCloseHandler}
          className={classes.modalStyle}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <IssueModalContent issue={currentIssue} />
        </Modal>
      }
    </div>
  );
};

export default MasterIssue;
