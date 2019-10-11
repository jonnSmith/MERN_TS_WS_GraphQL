import * as React from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MessageDelete from './MessageDelete';
import withSession from '../../Session/withSession';