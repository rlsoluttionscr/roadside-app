import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
  TextField
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'

const style = theme => ({
  backBtn: {
    marginRight: theme.spacing.unit
  },
  denseGrid: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  grid: {
    marginBottom: 24
  },
  radio: {
    marginTop: -16
  }
})

class AccountForm extends Component {
  state = {
    workingRadius: '',
    customSelected: false,
    customValue: '',
    abn: ''
  }

  handleTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChange = event => {
    event.persist()
    let isCustom = Boolean(event.target.getAttribute('custom'))
    this.setState(state => ({
      [event.target.name]: isCustom ? state.customValue : event.target.value,
      customSelected: isCustom
    }))
  }

  handleCustomChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      customValue: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateUserDetails({
      workingRadius: Number(this.state.workingRadius),
      abn: this.state.abn
    })
    this.props.handleNext()
  }

  render() {
    const {
      classes: { backBtn, radio, grid },
      handleBack
    } = this.props

    const { customSelected, abn } = this.state

    console.log('workform', this.state)

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24} className={grid}>
          <Grid item xs={12}>
            <label htmlFor="abn">
              <Typography variant="h6" color="primary">
                ABN
              </Typography>
            </label>

            <TextField
              required
              id="abn"
              name="abn"
              helperText="Australian Business Number (11-digit)"
              margin="dense"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                minLength: 11,
                maxLength: 11,
                pattern: '\\d{11}'
              }}
              value={abn}
              onChange={this.handleTextChange}
              style={{
                marginTop: 0
              }}
              autoComplete="off"
              // fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="h6" color="primary">
                Work radius
              </Typography>
              <RadioGroup
                aria-label="Work radius"
                name="workingRadius"
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="5"
                  control={<Radio required />}
                  label="5 km"
                />
                <FormControlLabel
                  className={radio}
                  value="10"
                  control={<Radio />}
                  label="10 km"
                />
                <FormControlLabel
                  className={radio}
                  value="15"
                  control={<Radio />}
                  label="15 km"
                />
                <FormControlLabel
                  value=""
                  control={
                    <Radio
                      inputProps={{
                        custom: 'true'
                      }}
                      style={{
                        marginTop: -12
                      }}
                    />
                  }
                  style={{
                    marginTop: -8
                  }}
                  label={
                    <FormControl>
                      <Input
                        id="customRadius"
                        name="workingRadius"
                        onChange={this.handleCustomChange}
                        endAdornment={
                          <InputAdornment position="end">km</InputAdornment>
                        }
                        style={{
                          width: 75,
                          fontSize: '0.875rem'
                          // paddingTop: 16
                        }}
                        type="number"
                        inputProps={{
                          min: 1
                        }}
                        required={customSelected}
                        disabled={!customSelected}
                      />

                      <FormHelperText id="weight-helper-text">
                        Work Radius
                      </FormHelperText>
                    </FormControl>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item container justify="flex-end" xs={12}>
          <Button onClick={handleBack} className={backBtn}>
            Back
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </form>
    )
  }
}

export default withStyles(style)(AccountForm)
