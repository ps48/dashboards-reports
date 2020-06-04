import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
    EuiButtonEmpty,
    EuiComboBox,
    EuiDatePicker,
    EuiFieldText,
    EuiSelect,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiButton,
    EuiPage,
    EuiPageHeader,
    EuiTitle,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiInMemoryTable,
    EuiHorizontalRule,
    EuiSpacer,
    EuiSearchBar,
    EuiLink,
    EuiTextArea,
    EuiEmptyPrompt,
    EuiRadioGroup,
  } from '@elastic/eui';
  import { htmlIdGenerator } from '@elastic/eui/lib/services';
  import moment from 'moment';
import { thisExpression } from '@babel/types';

  const idPrefix = htmlIdGenerator()();

  const ReportSettingsRadio = () => {
    const radios = [
        {
          id: `${idPrefix}0`,
          label: 'Dashboard',
        },
        {
          id: `${idPrefix}1`,
          label: 'Visualization',
        },
        {
          id: `${idPrefix}2`,
          label: 'Saved Search',
        },
      ];
    
      const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}1`);
    
      const onChangeSettingsRadio = optionId => {
        setRadioIdSelected(optionId);
      };
    
      return (
          <EuiRadioGroup
            options={radios}
            idSelected={radioIdSelected}
            onChange={id => onChangeSettingsRadio(id)}
            name="report settings radio group"
            legend={{
              children: <span>This is a legend for a radio group</span>,
            }}
          />
      );
  };

  const DeliveryChannelRadio = () => {
    const radios = [
        {
          id: `${idPrefix}3`,
          label: 'None (report will be available in Reports List page)',
        },
        {
          id: `${idPrefix}4`,
          label: 'Email',
        },
        {
          id: `${idPrefix}5`,
          label: 'Chime',
        },
        {
          id: `${idPrefix}6`,
          label: 'Other (webhook)'
        }
      ];
    
      const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}3`);
    
      const onChangeDeliveryChannel = optionId => {
        setRadioIdSelected(optionId);
      };
    
      return (
          <EuiRadioGroup
            options={radios}
            idSelected={radioIdSelected}
            onChange={id => onChangeDeliveryChannel(id)}
            name="delivery channel radio group"
            legend={{
              children: <span>This is a legend for a radio group</span>,
            }}
          />
      );
  };

  const DeliveryRecipientsBox = () => {
    const options = [
    ];
    const [selectedOptions, setSelected] = useState([]);
  
    const onChangeDeliveryRecipients = selectedOptions => {
      setSelected(selectedOptions);
    };
  
    const onCreateDeliveryRecipientOption = (searchValue, flattenedOptions = []) => {
      const normalizedSearchValue = searchValue.trim().toLowerCase();
  
      if (!normalizedSearchValue) {
        return;
      }
  
      const newOption = {
        label: searchValue,
      };
  
      // Create the option if it doesn't exist.
      if (
        flattenedOptions.findIndex(
          option => option.label.trim().toLowerCase() === normalizedSearchValue
        ) === -1
      ) {
        options.push(newOption);
      }
  
      // Select the option.
      setSelected([...selectedOptions, newOption]);
    };
  
    return (
      /* DisplayToggles wrapper for Docs only */
        <EuiComboBox
          placeholder="Select or create options"
          options={options}
          selectedOptions={selectedOptions}
          onChange={onChangeDeliveryRecipients}
          onCreateOption={onCreateDeliveryRecipientOption}
          isClearable={true}
          data-test-subj="demoComboBox"
        />
    );
  };


  export class CreateReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportSettingsRadioIdSelected: '',
            reportSettingsSetRadioIdSelected: `${idPrefix}1`,
            reportSettingsDashboard: '',
            deliveryEmailSubject: "",
            deliveryEmailBody: "",
            scheduleRadioFutureDateSelected: false,
            scheduleRadioRecurringSelected: false,
            scheduleUTCOffset: '',
            scheduleRecurringFrequency: 'Daily',
            scheduleRecurringDailyTime: '',
            scheduleRecurringDailyUTCOffset: '',
        };
    }

    onChangeReportSettingsRadio = (e) => {
        // this.setState({
        //     reportSettingsRadioIdSelected: e
        // });
    }
    onChangeReportSettingsDashboard = (e) => {
        this.setState({
            reportSettingsDashboard: e.target.value
        });
    }

    onChangeDeliveryEmailSubject = (e) => {
        this.setState({
            deliveryEmailSubject: e.target.value
        });
    }

    onChangeDeliveryEmailBody = (e) => {
        this.setState({
            deliveryEmailBody: e.target.value
        });
    }

    radios = [
        {
          id: `${idPrefix}0`,
          label: 'None (report will be available in Reports List page)',
        },
        {
          id: `${idPrefix}1`,
          label: 'Email',
        },
        {
          id: `${idPrefix}2`,
          label: 'Chime',
        },
        {
          id: `${idPrefix}3`,
          label: 'Other (webhook)'
        }
    ];

    componentDidMount() {
        const { httpClient } = this.props;
    }

    ScheduleRadioInClass = () => {
        const radios = [
            {
              id: `${idPrefix}7`,
              label: 'Now',
            },
            {
              id: `${idPrefix}8`,
              label: 'Future Date',
            },
            {
              id: `${idPrefix}9`,
              label: 'Recurring',
            },
          ];
        
          const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}7`);
        
          const onChangeSettingsRadio = optionId => {
            setRadioIdSelected(optionId);
            console.log(optionId)
            if (optionId === `${idPrefix}8`) {
                this.setState({
                    scheduleRadioFutureDateSelected: true
                });
                this.setState({
                    scheduleRadioRecurringSelected: false
                });
            }
            else if (`${idPrefix}9`) {
                this.setState({
                    scheduleRadioFutureDateSelected: false
                });
                this.setState({
                    scheduleRadioRecurringSelected: true
                });
            }
          };
        
          return (
              <EuiRadioGroup
                options={radios}
                idSelected={radioIdSelected}
                onChange={id => onChangeSettingsRadio(id)}
                name="schedule radio group"
                legend={{
                  children: <span>This is a legend for a radio group</span>,
                }}
              />
          );
    };

    timezone_options = [
        { value: -4, text: 'EDT -04:00' },
        { value: -5, text: 'CDT -05:00' },
        { value: -6, text: 'MDT -06:00' },
        { value: -7, text: 'MST/PDT -07:00' },
        { value: -8, text: 'AKDT -08:00' },
        { value: -10, text: 'HST -10:00' }
    ];

    ScheduleFutureDatePicker = () => {
        const [startDate, setStartDate] = useState(moment());
      
        const handleChangeScheduleDate = date => {
            setStartDate(date);
        };

        const onSelectOffsetChange = e => {
            this.setState({
              scheduleUTCOffset: parseInt(e.target.value, 10),
            });
        };

        return (
          <div>
            <EuiFormRow label="Time select on">
                <EuiDatePicker
                showTimeSelect
                selected={startDate}
                onChange={handleChangeScheduleDate}
                />
            </EuiFormRow>
            <EuiFormRow label="UTC offset">
                <EuiSelect
                options={this.timezone_options}
                value={this.state.scheduleUTCOffset}
                onChange={onSelectOffsetChange}
                />
            </EuiFormRow>
          </div>
        );
    }

    ScheduleRecurringDailyInput = () => {
        const [startDate, setStartDate] = useState(moment());

        const handleTimeChange = date => {
          setStartDate(date);
        };

        const onSelectOffsetChange = e => {
            this.setState({
              scheduleRecurringDailyUTCOffset: parseInt(e.target.value, 10),
            });
        };

        return (
            <div>
                <EuiFormRow label="Around">
                    <EuiDatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        selected={startDate}
                        onChange={handleTimeChange}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                    />
                </EuiFormRow>
                <EuiFormRow label="UTC offset">
                    <EuiSelect
                    options={this.timezone_options}
                    value={this.state.scheduleRecurringDailyUTCOffset}
                    onChange={onSelectOffsetChange}
                    />
                </EuiFormRow>
            </div>
        )
    }

    ScheduleRecurringWeeklyInput = () => {
        const recurringDayOptions = [
            { value: 'Monday', text: 'Monday' },
            { value: 'Tuesday', text: 'Tuesday' },
            { value: 'Wednesday', text: 'Wednesday' },
            { value: 'Thursday', text: 'Thursday' },
            { value: 'Friday', text: 'Friday' },
            { value: 'Saturday', text: 'Saturday' },
            { value: 'Sunday', text: 'Sunday' },
        ]
        return (
            <div>
                <EuiFormRow label="Every">

                </EuiFormRow>
            </div>
        );
    }

    ScheduleRecurringMonthlyInput = () => {

    }

    ScheduleRecurringFrequency = () => {
        const options = [
            { value: 'Daily', text: 'Daily' },
            { value: 'Weekly', text: 'Weekly' },
            { value: 'Monthly', text: 'Monthly' },
        ]

        const onChangeScheduleRecurringFrequency = e => {
            this.setState({
                scheduleRecurringFrequency: e.target.value
            });
        }

        const daily = (this.state.scheduleRecurringFrequency == 'Daily')
        ? <this.ScheduleRecurringDailyInput/>
        : null;

        return (
            <div>
                <EuiFormRow label="Frequency">
                    <EuiSelect
                        options={options}
                        value={this.state.scheduleRecurringFrequency}
                        onChange={onChangeScheduleRecurringFrequency}
                    />
                </EuiFormRow>
                {daily}
            </div>
        );
    }

    render() {
        const scheduleFutureDateCalendar = this.state.scheduleRadioFutureDateSelected
            ? <this.ScheduleFutureDatePicker/> 
            : null;

        const scheduleRecurringFrequencySelect = this.state.scheduleRadioRecurringSelected
            ? <this.ScheduleRecurringFrequency/>
            : null;
        return (
           <EuiPage>
               <EuiPageBody>
                  <EuiTitle>
                    <h1>Create Report</h1>
                  </EuiTitle>
                  <EuiPageContent panelPaddingSize={"l"}>
                        <EuiPageHeader>
                            <EuiTitle>
                                <h2>Report Settings</h2>
                            </EuiTitle>
                        </EuiPageHeader>
                        <EuiHorizontalRule/>
                        <EuiPageContentBody>
                            <b>Name</b> <br/>
                            Specify a descriptive report name <br/>
                            <br/>
                            <EuiFieldText
                                placeholder="Report Name"
                            />
                            <br/>
                            <b>Source</b> <br/>
                            <ReportSettingsRadio/> <br/>
                            {/* <EuiRadioGroup
                                options={this.radios}
                                idSelected={this.state.reportSettingsSetRadioIdSelected}
                                onChange={this.onChangeReportSettingsRadio}
                                name="radio group"
                                legend={{
                                children: <span>This is a legend for a radio group</span>,
                                }}
                            /> */}
                            <b>Dashboard</b> <br/>
                            <br/>
                            <EuiFlexGroup justifyContent="flexStart">
                                <EuiFlexItem>
                                    <EuiFieldText
                                        placeholder="Start typing to display suggestions"
                                        value={this.state.reportSettingsDashboard}
                                        onChange={this.onChangeReportSettingsDashboard}
                                    />
                                </EuiFlexItem>
                                <EuiFlexItem grow={false}>
                                    <EuiButton fill>Browse</EuiButton>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiPageContentBody>
                    </EuiPageContent>
                    <EuiSpacer/>
                    <EuiPageContent panelPaddingSize={"l"}>
                        <EuiPageHeader>
                            <EuiTitle>
                                <h2>Delivery</h2>
                            </EuiTitle>
                        </EuiPageHeader>
                        <EuiHorizontalRule/>
                        <EuiPageContentBody>
                            <b>Channel</b><br/>
                            <br/>
                            Define delivery notification channel <br/>
                            <br/>
                            <DeliveryChannelRadio/>
                            <br/>
                            <b>Recipients</b><br/>
                            <br/>
                            <DeliveryRecipientsBox/>
                            <br/>
                            <b>Email subject</b><br/>
                            <br/>
                            <EuiFieldText
                                placeholder="Subject line"
                                value={this.state.deliveryEmailSubject}
                                onChange={this.onChangeDeliveryEmailSubject}
                            />
                            <br/>
                            <b>Email body</b><br/>
                            <br/>
                            <EuiTextArea
                                placeholder="email body"
                                value={this.state.deliveryEmailBody}
                                onChange={this.onChangeDeliveryEmailBody}
                            />
                        </EuiPageContentBody>
                    </EuiPageContent>
                    <EuiSpacer/>
                    <EuiPageContent panelPaddingSize={"l"}>
                        <EuiPageHeader>
                            <EuiTitle>
                                <h2>Schedule</h2>
                            </EuiTitle>
                        </EuiPageHeader>
                        <EuiHorizontalRule/>
                        <EuiPageContentBody>
                            <b>Request Time</b> <br/>
                            <br/>
                            Define delivery schedule and frequency <br/>
                            <br/>
                            <this.ScheduleRadioInClass/>
                            <br/>
                            {scheduleFutureDateCalendar}
                            {scheduleRecurringFrequencySelect}
                        </EuiPageContentBody>
                    </EuiPageContent>
                    <EuiSpacer/>
                    <EuiFlexGroup justifyContent="flexEnd">
                        <EuiFlexItem grow={false}>
                            <EuiButtonEmpty>
                                Cancel
                            </EuiButtonEmpty>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiButton fill>Create</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
               </EuiPageBody>
           </EuiPage>
        );
    }
  }