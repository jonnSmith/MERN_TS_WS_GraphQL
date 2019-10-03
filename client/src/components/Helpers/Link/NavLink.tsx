import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Link as RouterLink, Route } from 'react-router-dom';
import { FontIcon, ListItem } from 'react-md';

const NavLink = ({ label, to, exact, icon, auth, action }) => {
  let leftIcon;
  if (icon) {
    leftIcon = <FontIcon>{icon}</FontIcon>;
  }
  if(to) {
    return (
      <Route path={to} exact={exact}>
      {({match}) => {
        return (
          <ListItem
            component={RouterLink}
            active={!!match}
            to={to}
            primaryText={label}
            leftIcon={leftIcon}
          />
        );

      }}
    </Route>)
  } else if (action) {
    return (
      <ApolloConsumer>
        {client => (
          <ListItem
            primaryText={label}
            onClick={() => action(client)}
            leftIcon={leftIcon}/>
        )}
      </ApolloConsumer>
    );
  }
};

export default NavLink;