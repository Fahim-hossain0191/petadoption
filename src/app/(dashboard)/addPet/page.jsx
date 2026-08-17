"use client"

import React from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const AddPet = () => {
    const {
        data:session,
    }=authClient.useSession()
    const user=session?.user
    console.log(user)

  const onSubmit=async(e)=>{
     e.preventDefault();
     const formData=new FormData(e.currentTarget);
     const destination=Object.fromEntries(formData.entries());
     console.log(destination);
     const res=await fetch('http://localhost:5000/addPet',{
       method:'POST',
       headers:{
        'content-type':'application/json'
       },
       body:JSON.stringify(destination)
     })
      const data=await res.json()
        if(data){
          redirect('/dashboardPage');
        }
        console.log(data)
  }

  return (
    <div className="min-h-screen bg-[#FFF0DD] py-10 px-5">
      <Card className="max-w-5xl mx-auto rounded-3xl shadow-xl bg-white border border-[#99CBB8]">
        <div className="bg-[#649EC4] rounded-t-3xl px-10 py-8">
          <h1 className="text-4xl font-bold text-[#FFF0DD]">
            Add New Pet
          </h1>

          <p className="text-[#FFF0DD]/90 mt-2">
            Fill in the information below to list your pet for adoption.
          </p>
        </div>

        <Form
          className="p-10"
          
          onSubmit={onSubmit}
        >
          <div className="grid md:grid-cols-2 gap-7 w-full">

            {/* Pet Name */}

            <TextField name="petName" isRequired>
              <Label>Pet Name</Label>
              <Input
                placeholder="Bella"
                className="rounded-xl"
              />
              <FieldError />
            </TextField>

            {/* Species */}

            <Select
              name="species"
              placeholder="Select Species"
              isRequired
            >
              <Label>Species</Label>

              <Select.Trigger className="rounded-xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Dog">Dog</ListBox.Item>
                  <ListBox.Item id="Cat">Cat</ListBox.Item>
                  <ListBox.Item id="Bird">Bird</ListBox.Item>
                  <ListBox.Item id="Rabbit">Rabbit</ListBox.Item>
                  <ListBox.Item id="Fish">Fish</ListBox.Item>
                  <ListBox.Item id="Other">Other</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Breed */}

            <TextField name="breed" isRequired>
              <Label>Breed</Label>
              <Input
                placeholder="Golden Retriever"
                className="rounded-xl"
              />
              <FieldError />
            </TextField>

            {/* Age */}

            <TextField
              name="age"
              type="number"
              isRequired
            >
              <Label>Age (Years)</Label>
              <Input
                type="number"
                placeholder="2"
                className="rounded-xl"
              />
              <FieldError />
            </TextField>

            {/* Gender */}

            <Select
              name="gender"
              placeholder="Select Gender"
              isRequired
            >
              <Label>Gender</Label>

              <Select.Trigger className="rounded-xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Male">Male</ListBox.Item>
                  <ListBox.Item id="Female">Female</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Health */}

            <TextField name="healthStatus" isRequired>
              <Label>Health Status</Label>
              <Input
                placeholder="Healthy"
                className="rounded-xl"
              />
              <FieldError />
            </TextField>

            {/* Vaccination */}

            <Select
              name="vaccinationStatus"
              placeholder="Vaccination Status"
              isRequired
            >
              <Label>Vaccination Status</Label>

              <Select.Trigger className="rounded-xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Vaccinated">
                    Vaccinated
                  </ListBox.Item>

                  <ListBox.Item id="Not Vaccinated">
                    Not Vaccinated
                  </ListBox.Item>

                  <ListBox.Item id="Partially Vaccinated">
                    Partially Vaccinated
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Location */}

            <TextField name="location" isRequired>
              <Label>Location</Label>
              <Input
                placeholder="Dhaka"
                className="rounded-xl"
              />
              <FieldError />
            </TextField>

            {/* Adoption Fee */}

            <TextField
              name="adoptionFee"
              type="number"
              isRequired
            >
              <Label>Adoption Fee (৳)</Label>
              <Input
                type="number"
                placeholder="1000"
                className="rounded-xl"
              />
              <FieldError />
            </TextField>

            {/* Image */}
             <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired>
                  <Label>Image URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/cat.jpg"
                    className="rounded-2xl"
                  />
                  <FieldError />
                </TextField>
              </div>

            {/* Description */}

            <div className="md:col-span-2">
              <TextField
                name="description"
                isRequired
              >
                <Label>Description</Label>

                <TextArea
                  placeholder="Tell adopters about the pet..."
                  className="rounded-2xl"
                />

                <FieldError />
              </TextField>
            </div>

            {/* Owner Email */}

            <div className="md:col-span-2">
              <TextField name="ownerEmail">
                <Label>Owner Email</Label>

                <Input
  readOnly
  value={user?.email || ""}
  className="rounded-xl bg-gray-100"
/>
              </TextField>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-10 w-full h-12 rounded-xl bg-[#FFB1A0] hover:bg-[#ff9d89] text-white text-lg font-semibold"
          >
            Add Pet
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddPet;