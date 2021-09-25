import React, { Fragment, useEffect, useState } from "react";
import { TextField, InputLabel, Input, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getProjectData } from "../../actions/project";
import { setUpdateProjectHandler } from "../../actions/settings";
import { modules, formats, projectCategory } from "../../utils/utils";
import {
  setProjectName,
  setProjectUrl,
  setProjectCategory,
  setProjectDescription,
} from "../../actions/settings";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { setIssueTypes } from "../../actions/issues";
import { Loader } from "../shared/loader/Loader";

const ProjectSettings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);
  const projectName = useSelector((state) => state.settingsReducer.projectName);
  const projectUrl = useSelector((state) => state.settingsReducer.projectUrl);
  const projectDescription = useSelector(
    (state) => state.settingsReducer.projectDescription
  );
  const selectedCategory = useSelector(
    (state) => state.settingsReducer.selectedCategory
  );
  const changeNameHandler = (e) => {
    dispatch(setProjectName(e.target.value));
  };
  const changeUrlHandler = (e) => {
    dispatch(setProjectUrl(e.target.value));
  };

  const changeProjectDescription = (value) => {
    dispatch(setProjectDescription(value));
  };

  const changeCategoryHandler = (event, newValue) => {
    dispatch(setProjectCategory(newValue));
  };

  const updateProjectHandler = () => {
    console.log("updateProjectHandler");
    const payload = {
      category: selectedCategory,
      description: projectDescription,
      name: projectName,
      url: projectUrl,
    };
    dispatch(setUpdateProjectHandler(payload));
  };

  useEffect(() => {
    if (Object.keys(project).length > 0) {
      dispatch(setProjectName(project.name));
      dispatch(setProjectUrl(project.url));
      dispatch(setProjectDescription(project.description));
      dispatch(setProjectCategory(project.category));
    }
  }, [project]);

  if (loader) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <p>Projects / {project.name} / Project Details</p>
      <h3>Project Details</h3>
      <div>
        <InputLabel htmlFor="name">Name</InputLabel>
        <TextField
          required
          id="name"
          value={projectName}
          onChange={changeNameHandler}
          variant="outlined"
          size="small"
        />
      </div>
      <div>
        <InputLabel htmlFor="url">Url</InputLabel>
        <TextField
          required
          id="url"
          value={projectUrl}
          onChange={changeUrlHandler}
          variant="outlined"
          size="small"
        />
      </div>
      <div>
        <InputLabel htmlFor="description">Description</InputLabel>
        <ReactQuill
          id="description"
          formats={formats}
          modules={modules}
          theme="snow"
          onChange={changeProjectDescription}
          value={projectDescription}
        />
        <span>Describe the project in as much detail as you like.</span>
      </div>
      <div>
        <InputLabel htmlFor="description">Project Category</InputLabel>
        <Autocomplete
          value={selectedCategory}
          onChange={(event, newValue) => changeCategoryHandler(event, newValue)}
          options={projectCategory}
          renderOption={(option) => {
            return (
              <Fragment>
                <span>{option}</span>
              </Fragment>
            );
          }}
          disableClearable={true}
          renderInput={(params) => (
            <TextField
              required={true}
              {...params}
              margin="normal"
              variant="outlined"
              autoFocus
              size="small"
            />
          )}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={updateProjectHandler}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default ProjectSettings;
