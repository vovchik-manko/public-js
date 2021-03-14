import { FormControlLabel, ListItem, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core';
import React from 'react';
import { Subscription } from 'rxjs';

import ResourceService from '../../services/ResourceService';


export default class User extends React.PureComponent<UserProps, UserState> {
  private data$$ = new Subscription();

  state = {
    live: false,
    value: null,
  }

  componentWillUnmount() {
    this.skipData();
  }

  render() {
    return (
      <ListItem>
        <ListItemText
          primary={`User ${this.props.id}: ${this.state.value ?? 'No Data.'}`}
          secondary={`${this.props.sourceKey}`}
        />
        <ListItemSecondaryAction>
          <FormControlLabel
            control={
              <Switch
                onChange={(_, checked) => this.handleChangeLiveMode(checked)}
                checked={this.state.live}
              />
            }
            label="live"
          />

        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  private handleChangeLiveMode = (checked: boolean) => {
    this.skipData();
    if (checked) {
      this.getData();
    }

    this.setState({live: checked});
  }

  private getData = () => {
    this.data$$ = ResourceService.getData(this.props.sourceKey).subscribe(data => {
      this.displayData(data);
    });
  }

  private skipData = () => {
    this.data$$.unsubscribe();
  }

  private displayData(value: number) {
    this.setState({value})
  }
}

interface UserProps {
  sourceKey: string;
  id: number;
}

interface UserState {
  live: boolean;
  value: null|number;
}