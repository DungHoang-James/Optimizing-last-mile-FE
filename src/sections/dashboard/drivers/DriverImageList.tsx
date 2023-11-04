import "photoswipe/dist/photoswipe.css";

import { Grid, Stack } from "@mui/material";
import { Gallery, Item } from "react-photoswipe-gallery";

import { Image } from "@/components/image";
import { Typography } from "@/components/typography";
import type { DriverProfile } from "@/types";

type Props = {
  imgList: Pick<
    DriverProfile,
    | "identificationCardFrontUrl"
    | "identificationCardBackUrl"
    | "drivingLicenseFrontUrl"
    | "drivingLicenseBackUrl"
    | "vehicleRegistrationCertificateFrontUrl"
    | "vehicleRegistrationCertificateBackUrl"
  >;
};

const NOT_AVAILABLE_IMG =
  "https://dummyimage.com/600x400/000/fff.png&text=Not+Available";

export default function DriverImageList({ imgList }: Props) {
  return (
    <Gallery>
      <Grid container rowGap={2} height={"100%"}>
        <Grid item xs={6}>
          <Typography variant={"subtitle1"}>
            Identification Card Front/Back:
          </Typography>
          <Stack direction={"row"} columnGap={1} flexWrap={"wrap"}>
            <Item
              original={imgList.identificationCardFrontUrl || NOT_AVAILABLE_IMG}
              thumbnail={
                imgList.identificationCardFrontUrl || NOT_AVAILABLE_IMG
              }
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={imgList.identificationCardFrontUrl || NOT_AVAILABLE_IMG}
                  width={150}
                  height={150}
                />
              )}
            </Item>
            <Item
              original={imgList.identificationCardBackUrl || NOT_AVAILABLE_IMG}
              thumbnail={imgList.identificationCardBackUrl || NOT_AVAILABLE_IMG}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={imgList.identificationCardBackUrl || NOT_AVAILABLE_IMG}
                  width={150}
                  height={150}
                />
              )}
            </Item>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Typography variant={"subtitle1"}>
            DrivingLicenseFront/Back:
          </Typography>
          <Stack direction={"row"} columnGap={1} flexWrap={"wrap"}>
            <Item
              original={imgList.drivingLicenseFrontUrl || NOT_AVAILABLE_IMG}
              thumbnail={imgList.drivingLicenseFrontUrl || NOT_AVAILABLE_IMG}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={imgList.drivingLicenseFrontUrl || NOT_AVAILABLE_IMG}
                  width={150}
                  height={150}
                />
              )}
            </Item>
            <Item
              original={imgList.drivingLicenseBackUrl || NOT_AVAILABLE_IMG}
              thumbnail={imgList.drivingLicenseBackUrl || NOT_AVAILABLE_IMG}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={imgList.drivingLicenseBackUrl || NOT_AVAILABLE_IMG}
                  width={150}
                  height={150}
                />
              )}
            </Item>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={"subtitle1"}>
            Vehicle Registration Certificate Front/Back:
          </Typography>
          <Stack direction={"row"} columnGap={1} flexWrap={"wrap"}>
            <Item
              original={
                imgList.vehicleRegistrationCertificateFrontUrl ||
                NOT_AVAILABLE_IMG
              }
              thumbnail={
                imgList.vehicleRegistrationCertificateFrontUrl ||
                NOT_AVAILABLE_IMG
              }
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={
                    imgList.vehicleRegistrationCertificateFrontUrl ||
                    NOT_AVAILABLE_IMG
                  }
                  width={150}
                  height={150}
                />
              )}
            </Item>
            <Item
              original={
                imgList.vehicleRegistrationCertificateBackUrl ||
                NOT_AVAILABLE_IMG
              }
              thumbnail={
                imgList.vehicleRegistrationCertificateBackUrl ||
                NOT_AVAILABLE_IMG
              }
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={
                    imgList.vehicleRegistrationCertificateBackUrl ||
                    NOT_AVAILABLE_IMG
                  }
                  width={150}
                  height={150}
                />
              )}
            </Item>
          </Stack>
        </Grid>
      </Grid>
    </Gallery>
  );
}
