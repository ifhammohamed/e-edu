import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Divider, Paragraph, Title } from "react-native-paper";
import TouchCountDisplay from "../components/TouchCountDisplay";
import { useTouchCount } from "../context/TouchCountContext";
const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const { incrementTouchCount } = useTouchCount(); // Access increment function

  console.log("🚀 ~ DetailScreen ~ item:", item);

  // Validate and extract data
  const school = item?.school || {};
  const student = item?.student || {};
  const latest = item?.latest || {};

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity>
          <Card
            style={styles.card}
            onPress={() => {
              incrementTouchCount();
            }}
          >
            <Card.Content>
              <Title>{school.name || "School Name Not Available"}</Title>
              <Paragraph>
                {school.city}, {school.state}
              </Paragraph>
              <Paragraph>{school.address || "Address Not Available"}</Paragraph>
              <Paragraph>
                Student Size: {student.size || "Not Available"}
              </Paragraph>
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
                    ? `${(
                        latest.admissions.admission_rate.overall * 100
                      ).toFixed(2)}%`
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
        </TouchableOpacity>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 10, right: 10 }}>
        <TouchCountDisplay />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
