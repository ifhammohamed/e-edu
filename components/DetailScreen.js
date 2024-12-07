import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, Divider } from "react-native-paper";

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  console.log("🚀 ~ DetailScreen ~ item:", item);

  // Validate and extract data
  const school = item?.school || {};
  const student = item?.student || {};
  const latest = item?.latest || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{school.name || "School Name Not Available"}</Title>
          <Paragraph>
            {school.city}, {school.state}
          </Paragraph>
          <Paragraph>{school.address || "Address Not Available"}</Paragraph>
          <Paragraph>Student Size: {student.size || "Not Available"}</Paragraph>
          <Paragraph>
            Website: {school.school_url || "Website Not Available"}
          </Paragraph>
          <Divider style={styles.divider} />
          <Title>Latest Details</Title>
          {latest.academics?.program && (
            <Paragraph>
              Academic Program: {latest.academics.program.name || "N/A"}
            </Paragraph>
          )}
          {latest.admissions && (
            <Paragraph>
              Admission Rate:{" "}
              {latest.admissions.admission_rate?.overall
                ? `${(latest.admissions.admission_rate.overall * 100).toFixed(
                    2
                  )}%`
                : "N/A"}
            </Paragraph>
          )}
          {latest.aid && (
            <Paragraph>
              Federal Loan Rate:{" "}
              {latest.aid.federal_loan_rate
                ? `${(latest.aid.federal_loan_rate * 100).toFixed(2)}%`
                : "N/A"}
            </Paragraph>
          )}
          {latest.earnings && (
            <Paragraph>
              Median Earnings 6 Years After Entry:{" "}
              {latest.earnings["6_yrs_after_entry"]?.median || "N/A"}
            </Paragraph>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
});

export default DetailScreen;
